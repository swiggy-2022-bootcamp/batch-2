require('dotenv').config();
const db = require("../models")
var moment = require('moment');
const User = db.users;
const Meeting = db.meetings;

//create meeting
exports.createMeeting = async (req,res) => {
    const meeting = new Meeting({
        start_date: req.body.meeting.start_date,
        start_time: req.body.meeting.start_time,
        end_time: req.body.meeting.end_time,
        description: req.body.meeting.description,
        invitee: req.body.user.id,
        members: req.body.meeting.members
    })

   meeting.members.push(req.body.user.id);

    meeting.save(meeting).then(
        data => {
            // update all members
            let members = [];
            members = req.body.meeting.members.slice();
            members.push(req.body.user.id);
            for (var i = 0; i < members.length; i++) { 
                console.log(members[i]); 
                User.updateOne({_id:members[i]}, { $addToSet: { meeting: [data.id] } }, 
                    function(err, res) {
                        if (err) {
                          res.send(err);
                        } 
                      }
                )
            }
            res.status(201).send({message: "Meeting created successfully"}); 
        }
    ).catch(err => {
        res.status(500).send({
            message:err.message ||"error while creating meeting."
        })
    })
}

// view meetings by date
exports.viewMeetings = async (req, res) => {

    const userId = req.params.id;
    const queryDate = req.body.date;
    let queryUser = await User.findOne({ _id: userId});
    let meetingIds = queryUser.meeting;

    let matchingMeetings = [];
    for(var i=0; i< meetingIds.length; ++i) {
        let meeting = await Meeting.findOne({_id: meetingIds[i]});
        var meetingDate = moment(meeting.start_date).format('YYYY-MM-DD');
        if(meetingDate == queryDate){
            matchingMeetings.push(meeting);
        }
    }
    res.status(201).send({meetings: matchingMeetings});
};

// search meeting by id
exports.findMeetingById = (req,res) => {
    const userId = req.params.id;
    const meetingId = req.body.id;
    
    Meeting.findById(meetingId).then(
        data => {
            if(!data)
              res.status(404).send({message:"No meeting exists with id: " + id});
            else
              res.send(data);
        }
    ).catch(err => {
        res.status(500).send({
            message:err.message ||"error while retrieving meeting with id " + id
        })
    })
}

//drop from meeting
exports.dropFromMeetingById = (req,res) => {
    const userId = req.params.id;
    const meetingId = req.body.id;

    User.updateOne({_id:userId}, { $pull: { meeting: meetingId } }, 
        function(err, res) {
            if (err) {
              res.send(err);
            } 
        }
    )

    Meeting.updateOne({_id:meetingId}, { $pull: { members: userId } }, 
        function(err, res) {
            if (err) {
              res.send(err);
            } 
        }
    )
    res.status(201).send({message: "Dropped from meeting successfully"}); 
}
