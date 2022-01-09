const MeetingModel = require('../models/Meeting');
const UserModel = require('../models/User');

//TODO: implement transactional context
const createMeeting = async (creatorUserId, startTime, endTime, description, participantEmailAddresses) => {
    const meeting = new MeetingModel();
    meeting.description = description;
    meeting.startTime = startTime;
    meeting.endTime = endTime;

    const creator = await UserModel.findOne({id: creatorUserId});
    meeting.users.push(creator);

    for await (let participantEmailAddress of participantEmailAddresses) {
        const participant = await UserModel.findOne({emailAddress: participantEmailAddress});
        meeting.users.push(participant);
    }
    
    //iterate over meetings and save info in all users.
    let response;
    await meeting.save().then((newMeeting)=>{
        response = {data: newMeeting, message: "Meeting created succesfully"};
    }).catch(err => {
        throw err;
    }); 

    for await (let participant of response.data.users) {
        participant.meetings.push(response.data);
        await participant.save();
    }

    return response;
}

module.exports = {
    createMeeting: createMeeting
}

// UserModel(meetingId:int) >|----|< MeetingModel (meetingId, User:ref)
// 

