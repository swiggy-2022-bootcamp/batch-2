const MeetingModel = require('../models/Meeting');
const UserModel = require('../models/User');
const userService = require('./userService');

const createMeeting = async (creatorUserId, startTime, endTime, description, participantEmailAddresses) => {
    const meeting = new MeetingModel();
    meeting.description = description;
    meeting.setMeetingTime(startTime, endTime);

    const creator = await UserModel.findOne({id: creatorUserId});
    meeting.participants.push(creator);

    if (participantEmailAddresses.length > 0)
        await addParticipantsToMeeting(participantEmailAddresses, meeting);
    
    let response;
    await meeting.save().then((newMeeting)=>{
        response = {status: 200, data: newMeeting, message: "Meeting created succesfully"};
    }).catch(err => {
        throw err;
    }); 

    await updateParticipantsWithMeetingId(response.data.participants, response.data.meetingId);

    return response;
}

const updateParticipantsWithMeetingId = async (participants, meetingIdToBeAdded) => {
    for await (let participant of participants) {
        participant.meetings.push(meetingIdToBeAdded);
        await participant.save();
    }
}

const removeMeetingIdFromParticipants = async (participants, meetingIdToBeRemoved) => {
    for await (let participant of participants) {
        participant.meetings = participant.meetings.filter((meetingId) => meetingId != meetingIdToBeRemoved);
        await participant.updateOne();
    }
}

const addParticipantsToMeeting = async (participantEmailAddresses, meetingWithParticipantInfo) => {
    for await (let participantEmailAddress of participantEmailAddresses) {
        const participant = await UserModel.findOne({emailAddress: participantEmailAddress});
        meetingWithParticipantInfo.participants.push(participant);
    }
}

const findAllMeetingsForUser = async (userId) => {
    let user = await UserModel.findOne({id: userId});
    let meetingIds = user.meetings;

    let meetings = [];
    for await (let meetingId of meetingIds) {
        let meeting = await MeetingModel.findOne({meetingId: meetingId}).populate('participants', 'emailAddress');
        meetings.push(meeting);
    }
    if (meetings.length > 0)
        return {status: 200, data: meetings, message: "All Meeting Details Fetched Succesfully"};
    else
        return {status: 200, message: "No Meetings found for this user"};
}

const findMeetingByMeetingId = async(userId, meetingId) => {
    let user = await UserModel.findOne({id: userId});
    let isMeetingIdValid = user.meetings.includes(meetingId);
    let meetingInfo = {};
    if (isMeetingIdValid) {
        meetingInfo = await MeetingModel.findOne({meetingId: meetingId}).populate({
            path: 'participants',
            transform: (doc) => doc.emailAddress
        });
    } else {
        return {status: 200, message: `No Meetings with id: ${meetingId} found for user: ${user.emailAddress}`};
    }
    return {status: 200, data: meetingInfo, message: "Meeting Details fetched succesfully"};
}

const updateMeeting = async (userId,
                            meetingId,
                            startTime,
                            endTime,
                            description) => {

    let user = await UserModel.findOne({id: userId});
    let isMeetingIdValid = user.meetings.includes(meetingId);
    let meetingWithParticipantInfo = {};

    if (isMeetingIdValid) {
        meetingWithParticipantInfo = await MeetingModel.findOne({meetingId: meetingId}).populate('participants');

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
        
        return {data: data, message: "Meeting updated successfully"};
    } else {
        return {message: "Invalid Meeting id"};
    }
}

const searchMeeting = async (userId, description, fromStartTime, toEndTime) => {
    let user = await UserModel.findOne({id: userId});
    let meetingIds = user.meetings;

    if (meetingIds) {
        let searchResult = [];
        for await(let meetingId of meetingIds) {
            let meeting = await MeetingModel.findOne({meetingId: meetingId});
            
            if (description) {
                if (meeting.description == description) {
                    searchResult.push(meeting);
                }
            }

            console.log(meeting.startTime, meeting.endTime);
            if (fromStartTime && toEndTime) {
                if (new Date(fromStartTime) <= new Date(meeting.startTime) 
                    && new Date(toEndTime) >= new Date(meeting.endTime)) {
                    searchResult.push(meeting);
                }
            }
        }
        return {data: searchResult, message: `Found ${searchResult.length} results for your query`};
    } else {
        return {message: "No meeting scheduled for this user"};
    }
}

const dropMeeting = async (userId, meetingIdToBeRemoved) => {
    let user = await UserModel.findOne({id: userId});
    if (user.meetings.includes(meetingIdToBeRemoved)) {
        let updatedMeetingIds = [];
        for (let meetingId of user.meetings) {
            if (meetingId != meetingIdToBeRemoved)
                updatedMeetingIds.push(meetingId);
        }

        user.meetings = [];
        user.meetings.push(...updatedMeetingIds);
        user = await user.save();

        let meetingWithParticipantIds = await MeetingModel.findOne({meetingId: meetingIdToBeRemoved}, {participants: 1}).populate('participants');
        let updatedParticipants = [];

        for await(let participant of meetingWithParticipantIds.participants) {
            if (participant.id != userId)
                updatedParticipants.push(participant);
        }

        meetingWithParticipantIds.participants = [];
        meetingWithParticipantIds.participants.push(...updatedParticipants);
        await meetingWithParticipantIds.save();
    }
}

module.exports = {
    createMeeting: createMeeting,
    findAllMeetingsForUser: findAllMeetingsForUser,
    findMeetingByMeetingId: findMeetingByMeetingId,
    searchMeeting: searchMeeting,
    updateMeeting: updateMeeting,
    dropMeeting: dropMeeting
}


