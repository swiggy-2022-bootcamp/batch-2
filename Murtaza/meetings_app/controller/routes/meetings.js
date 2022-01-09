var express = require('express');
var router = express.Router({mergeParams: true});
const meetingService = require('../../services/meetingService');
const auth = require('../auth');
const { 
  validateMeetingTimeInfo, 
  validateSearchQuery,
  validateAddParticipantRequest, 
  validateCreateMeetingRequest, 
  validateFindMeetingRequest, 
  validateRemoveParticipantRequest
} = require('../validator');

router.get('/search', auth, validateSearchQuery, async (req, res)=>{
  let description = req.query.description;
  let fromStartTime = req.query.from;
  let toEndTime = req.query.to;

  console.log(description);
  let result = await meetingService.searchMeeting(res.locals.userId, description, fromStartTime, toEndTime);
  res.status(200).json({data: result.data, message: result.message});
});

router.get('/:meetingId', auth, validateFindMeetingRequest, async (req, res) => {
  let result = await meetingService.findMeetingByMeetingId(res.locals.userId, req.params.meetingId);
  if (result.data) {
    res.json({data: result.data, message: result.message}).status(result.status);
  } else {
    res.json({message: result.message}).status(500);
  }
});

router.get('/', auth, async (req, res) => {
  let result = await meetingService.findAllMeetingsForUser(res.locals.userId);
  if (result.data)
    res.json({data: result.data, message: result.message}).status(result.status);
  else 
    res.json({message: result.message}).status(result.status);
});

router.post('/', auth,
  validateCreateMeetingRequest,
  validateMeetingTimeInfo,
  validateAddParticipantRequest, async (req, res) => {
    let creatorUserId = res.locals.userId;
    let {startTime, endTime, participants, description} = req.body;
    const result = await meetingService.createMeeting(creatorUserId, startTime, endTime, description, participants.add);
    res.json({data: result.data, message: result.message}).status(result.status);
});

router.patch('/:meetingId', auth, validateMeetingTimeInfo, async(req, res) => {
  console.log("I am in controller");
  let userId = res.locals.userId;
  let meetingId = req.params.meetingId;
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let description = req.body.description;

  let result = await meetingService.updateMeeting(userId, meetingId, startTime, endTime, 
    description);
  
  res.status(200).json({data: result.data, message: result.message});
});

router.delete('/:meetingId/drop', auth, async(req, res) => {
  await meetingService.dropMeeting(res.locals.userId, req.params.meetingId);
  res.json({message: "deleted from meeting succesfully"});
});

module.exports = router;
