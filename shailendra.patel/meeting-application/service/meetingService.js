const Meeting = require('../model/Meeting')

class MeetingService{

    constructor(){
        this.meetDirectory = new Map();
    }

    addMeeting(meet = new Meeting()){
        if(this.meetDirectory.has(meet.id)){
            console.log(`Meeting already registered with id ${meet.id}`);
            return false;
        }

        this.meetDirectory.set(meet.id, meet);
        console.log(`Meeting added successfully, meetId : ${meet.id}`);
        return true;
    }

    getMeetingDetails(meetId)
    {
        if(this.meetDirectory.has(meetId) === false){
            console.log(`No Meeting with id ${meet.id}`);
            return {}
        }
        // console.log(this.meetDirectory.get(meetId));
        return this.meetDirectory.get(meetId);
    }
}
const meetingService = new MeetingService();
module.exports = { meetingService };