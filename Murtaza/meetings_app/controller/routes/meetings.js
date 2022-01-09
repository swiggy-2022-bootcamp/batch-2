var express = require('express');
var router = express.Router({mergeParams: true});
const meetingService = require('../../services/meetingService');
const auth = require('../auth');
const requestValidator = require('../validator');

router.get('/:meetingId', auth, async (req, res, next) => {
  
});

router.get('/', auth, async (req, res, next) => {
  let result = await meetingService.findAllMeetingsForUser(res.locals.userId);
  if (result.data)
    res.json({status: 200, data: result.data, message: result.message});
  else 
    res.json({status: 200, message: result.message});
});

router.post('/', auth, requestValidator.validateCreateMeetingRequest, async (req, res) => {
  let creatorUserId = res.locals.userId;
  let {startTime, endTime, participantEmailAddresses, description} = req.body;
  const newMeetingInfo = await meetingService.createMeeting(creatorUserId, startTime, endTime, description, participantEmailAddresses);
  res.json({status: 200, data: newMeetingInfo.data, message: newMeetingInfo.message});
});

router.get('/search', (req, res)=>{
    res.send(`Searching for meeting based on description: ${req.query.description}, between ${req.query.from} and ${req.query.to}`);
});

module.exports = router;
