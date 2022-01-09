const moment = require('moment');
const {
    createMeetingService
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
        res.status(201).json({
            successMessage: `Meeting Created Successfully. Meeting ID: ${result.id}`
        });
    } catch (e) {
        res.status(400).json({
            errorMessage: `Something went wrong. ${e.message}`,
        })
    }
}

module.exports = {
    createMeetingController
}