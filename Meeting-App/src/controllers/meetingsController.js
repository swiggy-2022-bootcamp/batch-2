const moment = require('moment');
const {
    createMeetingService,
    viewMeetingsService,
    leaveMeetingService
} = require('../services/meetingsService');

const createMeetingController = async (req, res) => {
    let date = moment(req.body.date, 'MM/DD/YYYY');

    const meeting = {
        title: req.body.title,
        date: date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        description: req.body.description,
        attendees: req.body.attendees
    }

    meeting.attendees.push(req.user.email);

    // Converting attendees array to string for storing it in db
    meeting.attendees = meeting.attendees.toString();

    try {
        const result = await createMeetingService(meeting);
        return res.status(201).json({
            successMessage: `Meeting Created Successfully. Meeting ID: ${result.id}`
        });
    } catch (e) {
        return res.status(400).json({
            errorMessage: `Something went wrong. ${e.message}`,
        })
    }
}

const viewMeetingsController = async (req, res) => {
    const email = req.user.email;
    const time = req.params.time;

    try {
        const result = await viewMeetingsService(email);

        const filteredMeetings = result.filter((meeting) => {
            const todayMomentVal = moment().format('YYYY-MM-DD');
            const meetingDateMomentVal = meeting.date;
            if(time == 'past'){
                return moment(meetingDateMomentVal).isBefore(todayMomentVal);
            } else if (time == 'today') {
                return moment(meetingDateMomentVal).isSame(todayMomentVal);
            } else if (time == 'future') {
                return moment(meetingDateMomentVal).isAfter(todayMomentVal);
            } else {
                return moment(meetingDateMomentVal).isSameOrAfter(todayMomentVal);
            }
            
        });

        return res.status(201).json({
            successMessage: `Meetings fetched successfully`,
            data: filteredMeetings
        });
    } catch (e) {
        return res.status(400).json({
            errorMessage: `Something went wrong. ${e.message}`,
        })
    }
}

const searchMeetingsController = async (req, res) => {
    const email = req.user.email;
    const meetingId = req.params.meetingId;
    const title = req.query.title;
    const desc = req.query.desc;

    try {
        let result = await viewMeetingsService(email);

        if(title != null) {
            result = result.filter((meeting) => {
                return (meeting.title).includes(title);
            })
        } else if (desc != null) {
            result = result.filter((meeting) => {
                return (meeting.description).includes(desc);
            })
        } else {
            result = result.filter((meeting) => {
                return meeting.id == meetingId;
            });
        }
        
        if(result.length > 0) {
            return res.status(201).json({
                successMessage: `Meetings fetched successfully`,
                data: result
            });
        } else {
            return res.status(400).json({
                errorMessage: `Meeting with ID: ${meetingId} doesn't exists.`
            })
        }
        
    } catch (e) {
        return res.status(400).json({
            errorMessage: `Something went wrong. ${e.message}`,
        })
    }
}

const leaveMeetingsController = async (req, res) => {
    const email = req.user.email;
    const meetingId = req.params.meetingId;

    try {
        let result = await viewMeetingsService(email);

        meeting = result.filter((meeting) => {
            return meeting.id == meetingId;
        });

        if(result.length > 0) {
            let attendees = meeting[0].attendees.split(",");
            attendees = attendees.filter((attendee) => {
                return attendee != email;
            })
            meeting[0].attendees = attendees.toString();
            
            await leaveMeetingService(meeting[0]);
            return res.status(200).json({
                successMessage: 'Left Meeting Successfully'
            })
        } else {
            return res.status(400).json({
                errorMessage: `Meeting with ID: ${meetingId} doesn't exists.`
            })
        }
        
    } catch (e) {
        return res.status(400).json({
            errorMessage: `Something went wrong. ${e.message}`,
        })
    }
}

module.exports = {
    createMeetingController,
    viewMeetingsController,
    searchMeetingsController,
    leaveMeetingsController
}