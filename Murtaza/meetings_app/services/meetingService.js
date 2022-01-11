const MeetingModel = require("../models/Meeting");
const UserModel = require("../models/User");
const createError = require("http-errors");
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { create } = require("../models/Meeting");

const createMeeting = async (creatorUserId, startTime, endTime, description, participantEmailAddresses) => {
    const meeting = new MeetingModel();
    meeting.description = description;
    meeting.setMeetingTime(startTime, endTime);

    const creator = await UserModel.findOne({ id: creatorUserId });
    meeting.participants.push(creator);

    if (participantEmailAddresses.length > 0)
        await addParticipantsToMeeting(participantEmailAddresses, meeting);

    let response;
    await meeting.save().then((newMeeting) => {
        response = { data: newMeeting, message: "Meeting created succesfully" };
    }).catch((err) => {
        throw createError(500, "Unable to create new meeting");
    });
    await updateParticipantsWithMeetingId(response.data.participants, response.data.meetingId);
    return response;
};

const updateParticipantsWithMeetingId = async (participants, meetingIdToBeAdded) => {
    for await (let participant of participants) {
        if (!participant.meetings.includes(meetingIdToBeAdded))
        {
            participant.meetings.push(meetingIdToBeAdded);
            await participant.save();
        }
    }
};

const addParticipantsToMeeting = async (participantEmailAddresses, meetingWithParticipantInfo) => {
    let duplicateEmailAddresses = [];
    for await (let participantEmailAddress of participantEmailAddresses) {
        let alreadyExistingParticipantEmailAddresses = meetingWithParticipantInfo.participants
            .map(participant=>participant.emailAddress);
            
        if (alreadyExistingParticipantEmailAddresses.includes(participantEmailAddress))
            duplicateEmailAddresses.push(participantEmailAddress);
    }

    if (duplicateEmailAddresses.length > 0)
        throw createError(400, `[${duplicateEmailAddresses}] Participants already exists in the meeting`);

    for await (let participantEmailAddress of participantEmailAddresses) {
        const participant = await UserModel.findOne({emailAddress: participantEmailAddress});
        meetingWithParticipantInfo.participants.push(participant);
    }
};

const findAllMeetingsForUser = async (userId) => {
    let user = await UserModel.findOne({ id: userId });
    let meetingIds = user.meetings;

    let meetings = [];
    for await (let meetingId of meetingIds) {
        let meeting = await MeetingModel.findOne({ meetingId: meetingId }).populate(
            "participants",
            "emailAddress"
        );
        meetings.push(meeting);
    }
    if (meetings.length > 0)
        return {
            data: meetings,
            message: "All Meeting Details Fetched Succesfully",
        };
    else throw createError(404, `No Meetings found for user id: ${userId}`);
};

const findMeetingByMeetingId = async (userId, meetingId) => {
    let user = await UserModel.findOne({ id: userId });
    let isMeetingIdValid = user.meetings.includes(meetingId);
    let meetingInfo = {};
    if (isMeetingIdValid) {
        meetingInfo = await MeetingModel.findOne({ meetingId: meetingId }).populate({ path: "participants", transform: (doc) => doc.emailAddress });
    } else {
        throw createError(404, `No Meetings with id: ${meetingId} found for user: ${user.emailAddress}`);
    }
    return { status: 200, data: meetingInfo, message: "Meeting Details fetched succesfully" };
};

const updateMeeting = async (userId, meetingId, startTime, endTime, description, participantEmailAddressesToBeAdded) => {
    let user = await UserModel.findOne({ id: userId });
    let isMeetingIdValid = user.meetings.includes(meetingId);
    let meetingWithParticipantInfo = {};

    if (!isMeetingIdValid) {
        throw createError(400, "Invalid meeting id");
    }

    meetingWithParticipantInfo = await MeetingModel.findOne({ meetingId: meetingId }).populate("participants");

    if (startTime && endTime) {
        meetingWithParticipantInfo.setMeetingTime(startTime, endTime);
    } else if (startTime) {
        meetingWithParticipantInfo.setMeetingTime(startTime, meetingWithParticipantInfo.endTime);
    } else if (endTime) {
        meetingWithParticipantInfo.setMeetingTime(meetingWithParticipantInfo.startTime, endTime);
    }

    if (description) {
        meetingWithParticipantInfo.description = description;
    }

    if (participantEmailAddressesToBeAdded)
        await addParticipantsToMeeting(participantEmailAddressesToBeAdded, meetingWithParticipantInfo);
    
    let updatedMeeting = await meetingWithParticipantInfo.save();

    if (participantEmailAddressesToBeAdded) {
        updatedMeeting = await MeetingModel.findOne({meetingId: meetingId}).populate('participants');
        await updateParticipantsWithMeetingId(updatedMeeting.participants, updatedMeeting.meetingId);
    }
    
    return { data: updatedMeeting, message: "Meeting updated successfully" };
};

const searchMeeting = async (userId, description, fromStartTime, toEndTime) => {
    let user = await UserModel.findOne({ id: userId });
    let meetingIds = user.meetings;

    if (!meetingIds) {
        throw createError(404, "No meeting scheduled for this user");
    }

    let searchResult = [];
    for await (let meetingId of meetingIds) {
        let meeting = await MeetingModel.findOne({ meetingId: meetingId });

        if (description) {
            if (meeting.description.includes(description)) {
                searchResult.push(meeting);
            }
        }

        if (fromStartTime && toEndTime) {
            if (new Date(fromStartTime) <= new Date(meeting.startTime)
                && new Date(toEndTime) >= new Date(meeting.endTime)) {
                searchResult.push(meeting);
            }
        }
    }
    return { data: searchResult, message: `Found ${searchResult.length} results for your query` };
};

const dropMeeting = async (userId, meetingIdToBeRemoved) => {
    let user = await UserModel.findOne({ id: userId });
    if (!user.meetings.includes(meetingIdToBeRemoved)) {
        throw createError(400, "Invalid meeting id");
    }

    let updatedMeetingIds = [];

    for (let meetingId of user.meetings) {
        if (meetingId != meetingIdToBeRemoved) updatedMeetingIds.push(meetingId);
    }

    user.meetings = [];
    user.meetings.push(...updatedMeetingIds);
    user = await user.save();

    let meetingWithParticipantIds = await MeetingModel.findOne({ meetingId: meetingIdToBeRemoved }, { participants: 1 }).populate("participants");
    let updatedParticipants = [];
    for (let participant of meetingWithParticipantIds.participants) {
        if (participant.id != userId)
            updatedParticipants.push(participant);
    }

    if (updatedParticipants.length == 0) {
        await MeetingModel.findOneAndDelete({_id: meetingWithParticipantIds._id});
    } else {
        meetingWithParticipantIds.participants = [];
        meetingWithParticipantIds.participants.push(...updatedParticipants);
        await meetingWithParticipantIds.save();
    }
    console.log(meetingWithParticipantIds);
};

const joinMeeting = async(userId, meetingId) => {
    let user = await UserModel.findOne({id: userId});
    let meeting = await MeetingModel
        .findOne({meetingId: meetingId}, {username: 1, emailAddress: 1, participants: 1, startTime: 1, endTime: 1})
        .populate({path: 'participants', transform: (doc)=>doc.id});
    
    if (!meeting.participants.includes(userId)) {
        throw createError(403, "User is not a participant")
    }

    return generateMeetingToken(user, meeting.startTime, meeting.endTime);
}

const generateMeetingToken = (user, startTime, endTime) => {
    try {
        const pkPath = path.join(__dirname, '..', 'config', 'jitsi.pk');
        const privateKey = fs.readFileSync(pkPath, 'utf8');
        const token = jwt.sign({ 
            aud: "jitsi",
            exp: Math.floor(endTime/1000),
            nbf: Math.floor(startTime/1000),
            iss: "chat",
            room: "*",
            sub: `${config.get("app.jitsi.appId")}`,
            context: {
                user: {
                    name: user.username,
                    email: user.emailAddress
                }
            }
        }, privateKey, {algorithm: "RS256", header: { kid: `${config.get("app.jitsi.kId")}`} });
        return token;
    } catch (err) {
        console.log(err);
        throw createError(500, "something went wrong in generating meeting token");
    }
}

module.exports = {
    createMeeting: createMeeting,
    findAllMeetingsForUser: findAllMeetingsForUser,
    findMeetingByMeetingId: findMeetingByMeetingId,
    searchMeeting: searchMeeting,
    updateMeeting: updateMeeting,
    dropMeeting: dropMeeting,
    joinMeeting: joinMeeting
};
