const Meeting = require('../model/Meeting')
const fs = require('fs');
const { throws } = require('assert');

class MeetingService{

    constructor(){
        this.meetDirectory = new Map();
        this.userMeeting = new Map(new String(), new Set());
    }

    createMeeting(meet = new Meeting()){
        if(this.meetDirectory.has(meet.id)){
            console.log(`Meeting already registered with id ${meet.id}`);
            return false;
        }

        this.meetDirectory.set(meet.id, meet);
        const emailIds = meet.participants.split(',');
        emailIds.forEach((userId) => this.addMeetingToUser(userId, meet.id));

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

    addMeetingToUser(userId=null, meetId=null){
        
        if(this.userMeeting.has(userId) == false)
            this.userMeeting.set(userId, new Set());
        this.userMeeting.get(userId).add(meetId);
        // console.log(this.userMeeting.get(userId));
    }

    getAllMeetingForUser(userId=null)
    {
        if(this.userMeeting.has(userId) === false){
            return {userId: `${userId}`,error: "No meeting for user."};
        }
        const meetingIds = Array.from(this.userMeeting.get(userId));
        const meetings = [];
        meetingIds.forEach(meetId => {
            meetings.push(this.meetDirectory.get(meetId));
        })
        return meetings;
    }

    onstartUP(){
        var fs = require('fs');

        const data = JSON.parse(fs.readFileSync("./data/meetingService.json"));
        // console.log(typeof(data));
        for(let i=0; i<data.length; i++){
            let meet = Object.assign(new Meeting(), data[i]);
            this.createMeeting(meet);
        }
        // console.log(data)
    }

    writeUsersToJSONFile() {
        const obj = [];

        for(const meeting of this.meetDirectory.values())
            obj.push(meeting);

        fs.writeFile ("./data/meetingService.json", JSON.stringify(obj), function(err) {
            if (err) throw err;
            console.log('complete writing meeting service data to json file.');
        });
    }
}
const meetingService = new MeetingService();
meetingService.onstartUP();
module.exports = { meetingService };