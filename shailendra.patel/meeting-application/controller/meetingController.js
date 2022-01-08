const Meeting = require('../model/Meeting')
const { authService } = require('../service/authService')
const { meetingService } = require('../service/meetingService')
const { validationResult } = require('express-validator');
const { 
    v1: uuidv1,
  } = require('uuid');

exports.createMeeting = (req, res) => {

    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        })
    }

    let {dateOfMeeting, startTime, endTime, description, participants} = req.body;
    const organizer = req.body.userId;
    const emailIds = participants.split(',');
    emailIds.push(organizer);
    
    participants = new Set(emailIds);
    participants = Array.from(participants);
    let invitees = "";
    //validate userId provided in meeting details
    for(let i=0; i<participants.length; i++)
    {
        if(authService.validateUser(participants[i]) === false)
        {
            return res.status(400).json({
                error: `Invalid user ${participants[i]}`
            })
        }
        invitees += participants[i] + ",";
    }

    invitees = invitees.slice(0,-1);
    
    const meetId = uuidv1()
    const newMeeting = new Meeting(meetId, new Date(dateOfMeeting), startTime, endTime, description, invitees);
    
    //store meeting in db
    meetingService.createMeeting(newMeeting);
    return res.status(201).json({
        meetingDetails: newMeeting
    });
}

exports.getMeetingForUser = (req, res) => {
    const userId = req.body.userId;
    return res.status(200).json({
        userId: `${userId}`,
        meeting_details: meetingService.getAllMeetingForUser(userId)
    });
}

exports.getMeetingDetail = (req, res) => {
    const userId = req.body.userId;
    const meetId = req.params['meetingId'];
    
    if(authService.validateUser(userId) === false)
    {
        return res.status(400).json({
            error: `Invalid user ${participants[i]}`
        })
    }

    return res.status(200).json({
        userId: `${userId}`,
        meeting_details: meetingService.getMeetingDetails(meetId)
    })

}