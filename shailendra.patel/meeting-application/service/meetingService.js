const Meeting = require('../model/Meeting')
const fs = require('fs');

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

    writeUsersToJSONFile() {
        const obj = [];

        for(const user of this.meetDirectory.values())
            obj.push(user);

        fs.writeFile ("./data/meetingService.json", JSON.stringify(obj), function(err) {
            if (err) throw err;
            console.log('complete writing meeting service data to json file.');
        });
    }
}
const meetingService = new MeetingService();
module.exports = { meetingService };