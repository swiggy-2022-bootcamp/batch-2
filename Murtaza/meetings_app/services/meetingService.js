const MeetingModel = require("../models/Meeting");
const UserModel = require("../models/User");
const userService = require("./userService");
const createError = require("http-errors");

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
        response = { status: 200, data: newMeeting, message: "Meeting created succesfully" };
    }).catch((err) => {
        throw createError(500, "Unable to create new meeting");
    });

    await updateParticipantsWithMeetingId(response.data.participants, response.data.meetingId);

    return response;
};

const updateParticipantsWithMeetingId = async (participants, meetingIdToBeAdded) => {
    for await (let participant of participants) {
        participant.meetings.push(meetingIdToBeAdded);
        await participant.save();
    }
};

const addParticipantsToMeeting = async (participantEmailAddresses, meetingWithParticipantInfo) => {
    for await (let participantEmailAddress of participantEmailAddresses) {
        const participant = await UserModel.findOne({
            emailAddress: participantEmailAddress,
        });
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

const updateMeeting = async (userId, meetingId, startTime, endTime, description) => {
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

    let data = await meetingWithParticipantInfo.save();
    return { data: data, message: "Meeting updated successfully" };
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

    for await (let participant of meetingWithParticipantIds.participants) {
        if (participant.id != userId)
            updatedParticipants.push(participant);
    }

    meetingWithParticipantIds.participants = [];
    meetingWithParticipantIds.participants.push(...updatedParticipants);
    await meetingWithParticipantIds.save();
};

module.exports = {
    createMeeting: createMeeting,
    findAllMeetingsForUser: findAllMeetingsForUser,
    findMeetingByMeetingId: findMeetingByMeetingId,
    searchMeeting: searchMeeting,
    updateMeeting: updateMeeting,
    dropMeeting: dropMeeting,
};
