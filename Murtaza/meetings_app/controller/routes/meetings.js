var express = require('express');
var router = express.Router({mergeParams: true});
const meetingService = require('../../services/meetingService');
const auth = require('../auth');

router.get('/:meetingId', auth, function(req, res, next) {
  res.send(`Here's meeting id: ${req.params.meetingId} info for user id: ${res.locals.userId}`);
});

router.get('/', auth, function(req, res, next) {
  res.send(`Here's all meetings for user id: ${res.locals.userId}`);
});

router.post('/', auth, async (req, res) => {
  let creatorUserId = res.locals.userId;
  let {startTime, endTime, participantEmailAddresses, description} = req.body;
  const newMeetingInfo = await meetingService.createMeeting(creatorUserId, startTime, endTime, description, participantEmailAddresses);
  res.json({status: 200, data: newMeetingInfo.data, message: newMeetingInfo.message});
});

router.get('/search', (req, res)=>{
    res.send(`Searching for meeting based on description: ${req.query.description}, between ${req.query.from} and ${req.query.to}`);
});

module.exports = router;
