const MeetingModel = require('../models/Meeting');
const UserModel = require('../models/User');
const userService = require('./userService');

//TODO: implement transactional context
const createMeeting = async (creatorUserId, startTime, endTime, description, participantEmailAddresses) => {
    const meeting = new MeetingModel();
    meeting.description = description;
    meeting.setMeetingTime(startTime, endTime);

    const creator = await UserModel.findOne({id: creatorUserId});
    meeting.participants.push(creator);

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
        await participant.save();
    }
}

const addParticipantsToMeeting = async (participantEmailAddresses, meetingWithParticipantInfo) => {
    for await (let participantEmailAddress of participantEmailAddresses) {
        const participant = await UserModel.findOne({emailAddress: participantEmailAddress});
        meetingWithParticipantInfo.participants.push(participant);
    }
}

const removeParticipantsFromMeeting = async (participantEmailAddressesToBeRemoved, meetingWithParticipantInfo) => {
    let exisingMeetingParticipants = meetingWithParticipantInfo.participants;
    
    let updatedMeetingParticipants = exisingMeetingParticipants
        .filter((participant) => !(participant.emailAddress in participantEmailAddressesToBeRemoved));
    meetingWithParticipantInfo.participants = [];
    meetingWithParticipantInfo.participants.push(...updatedMeetingParticipants);
        
    let removedParticipants = exisingMeetingParticipants
        .filter((participant) => (participant.emailAddress in participantEmailAddressesToBeRemoved));
    await removeMeetingIdFromParticipants(removedParticipants, meetingWithParticipantInfo.meetingId);
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

const updateMeeting = async (userId, meetingId, startTime, endTime, description, addParticipantEmailAddresses, removeParticipantEmailAddresses) => {

    let user = UserModel.findOne({id: userId});
    let isMeetingIdValid = user.meetings.includes(meetingId);
    let meetingWithParticipantInfo = {};

    if (isMeetingIdValid) {
        meetingWithParticipantInfo = await MeetingModel.findOne({meetingId: meetingId}).populate({
            path: 'participants',
            transform: function(doc) {
                return doc.emailAddress;
            }
        });

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

        if (addParticipantEmailAddresses) {
            await addParticipantsToMeeting(addParticipantEmailAddresses, meetingWithParticipantInfo);        
            await updateParticipantsWithMeetingId(meetingWithParticipantInfo.participants, meetingWithParticipantInfo.meetingId);
        }
        if (removeParticipantEmailAddresses)
            await removeParticipantsFromMeeting(removeParticipantEmailAddresses, meetingWithParticipantInfo);
    }
}

module.exports = {
    createMeeting: createMeeting,
    findAllMeetingsForUser: findAllMeetingsForUser,
    findMeetingByMeetingId: findMeetingByMeetingId
}

// UserModel(meetingId:int) >|----|< MeetingModel (meetingId, User:ref)
// 

