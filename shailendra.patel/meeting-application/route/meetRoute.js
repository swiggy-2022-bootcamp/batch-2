var express = require('express');
var router = express.Router();

const { check } = require('express-validator');
const {createMeeting, getMeetingForUser, getMeetingDetail } = require('../controller/meetingController')
const { authenticateToken } = require('../controller/authController')

router.post("/meeting", [
    authenticateToken,
    check("dateOfMeeting", "Valid date is required").isDate(),
    check("startTime", "StartTime should be in format hhmm and numeric only").isInt({min:0000, max:2359}),
    check("endTime", "EndTime should be in format hhmm and numeric only").isInt({min:0000, max:2359}),
    check("description", "Description should not be empty").isLength({min:1}),
    check("participants", "Participants should not be empty").isLength({min:1})
],createMeeting);

router.get("/user/meetings", authenticateToken, getMeetingForUser);

router.get("/user/meetings/:meetingId", authenticateToken, getMeetingDetail);

module.exports = router;