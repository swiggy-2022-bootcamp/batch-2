var express = require('express');
var router = express.Router({mergeParams: true});
const meetingService = require('../../services/meetingService');
const auth = require('../auth');
const requestValidator = require('../validator');

router.get('/:meetingId', auth, requestValidator.validateFindMeetingRequest, async (req, res, next) => {
  let result = await meetingService.findMeetingByMeetingId(res.locals.userId, req.params.meetingId);
  if (result.data) {
    res.json({data: result.data, message: result.message}).status(result.status);
  } else {
    res.json({message: result.message}).status(500);
  }
});

router.get('/', auth, async (req, res, next) => {
  let result = await meetingService.findAllMeetingsForUser(res.locals.userId);
  if (result.data)
    res.json({data: result.data, message: result.message}).status(result.status);
  else 
    res.json({message: result.message}).status(result.status);
});

router.post('/', auth,
  requestValidator.validateCreateMeetingRequest,
  requestValidator.validateMeetingTimeInfo,
  requestValidator.validateAddParticipantRequest, async (req, res) => {
    let creatorUserId = res.locals.userId;
    let {startTime, endTime, participantEmailAddresses, description} = req.body;
    const result = await meetingService.createMeeting(creatorUserId, startTime, endTime, description, participantEmailAddresses);
    res.json({data: result.data, message: result.message}).status(result.status);
});

router.patch('/:meetingId', auth, async(req, res) => {

});

router.get('/search', (req, res)=>{
    res.send(`Searching for meeting based on description: ${req.query.description}, between ${req.query.from} and ${req.query.to}`);
});

module.exports = router;
