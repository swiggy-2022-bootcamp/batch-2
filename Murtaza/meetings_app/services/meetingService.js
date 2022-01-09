const MeetingModel = require('../models/Meeting');
const UserModel = require('../models/User');

//TODO: implement transactional context
const createMeeting = async (creatorUserId, startTime, endTime, description, participantEmailAddresses) => {
    const meeting = new MeetingModel();
    meeting.description = description;
    meeting.startTime = startTime;
    meeting.endTime = endTime;

    const creator = await UserModel.findOne({id: creatorUserId});
    meeting.participants.push(creator);

    for await (let participantEmailAddress of participantEmailAddresses) {
        const participant = await UserModel.findOne({emailAddress: participantEmailAddress});
        meeting.participants.push(participant);
    }
    
    //iterate over meetings and save info in all users.
    let response;
    await meeting.save().then((newMeeting)=>{
        response = {status: 200, data: newMeeting, message: "Meeting created succesfully"};
    }).catch(err => {
        throw err;
    }); 

    for await (let participant of response.data.participants) {
        participant.meetings.push(response.data.meetingId);
        await participant.save();
    }

    return response;
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
            transform: function(doc) {
                return doc.emailAddress;
            }
        });
    } else {
        return {status: 200, message: `No Meetings with id: ${meetingId} found for user: ${user.emailAddress}`};
    }
    return {status: 200, data: meetingInfo, message: "Meeting Details fetched succesfully"};
}

module.exports = {
    createMeeting: createMeeting,
    findAllMeetingsForUser: findAllMeetingsForUser,
    findMeetingByMeetingId: findMeetingByMeetingId
}

// UserModel(meetingId:int) >|----|< MeetingModel (meetingId, User:ref)
// 

