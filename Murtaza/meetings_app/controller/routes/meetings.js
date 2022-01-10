const express = require("express");
const router = express.Router({ mergeParams: true });
const meetingService = require("../../services/meetingService");
const auth = require("../auth");
const config = require('config');

const {
  validateMeetingTimeInfo,
  validateSearchQuery,
  validateAddParticipantRequest,
  validateCreateMeetingRequest,
  validateFindMeetingRequest,
  validateRemoveParticipantRequest,
} = require("../validator");

/**
 * GET /
 * description: find details of all meetings for logged in user
 */
router.get("/", auth, (req, res, next) => {
    meetingService.findAllMeetingsForUser(req.userId)
      .then(result => res.status(200).json({ data: result.data, message: result.message }))
      .catch(err=>{
        console.log(err);
        next(err);
      });
});

/**
 * GET /search
 * Description: search meetings for logged in user
 * query params:
 *    description: String
 *    from: timestamp
 *    to: timestamp
 */
router.get("/search", auth, validateSearchQuery, (req, res, next) => {
    let description = req.query.description;
    let fromStartTime = req.query.from;
    let toEndTime = req.query.to;

    meetingService.searchMeeting(req.userId, description, fromStartTime, toEndTime).then(result => {
      res.status(200).json({ data: result.data, message: result.message });
    }).catch(err => {
      console.log(err);
      next(err);
    });
});

/**
 * GET /:meetingId
 * Description: find meeting details for meetingId for logged in user
 *    route params: meetingId
 */
router.get("/:meetingId", auth, validateFindMeetingRequest, (req, res, next) => {
    meetingService.findMeetingByMeetingId(req.userId, req.params.meetingId)
      .then(result => {
        res.status(result.status).json({ data: result.data, message: result.message });
      }).catch(err=>{
        console.log(err);
        next(err);
      });
});

/**
 * POST /
 * Description: create new meeting
 *    body:
 *		startTime: timestamp
 *		endTime: timestamp
 * 		participants: Array(String)
 * 		description: String
 */
router.post("/", auth, validateCreateMeetingRequest, validateMeetingTimeInfo, validateAddParticipantRequest, (req, res, next) => {
	let creatorUserId = req.userId;
	let { startTime, endTime, participants, description } = req.body;
	meetingService.createMeeting(creatorUserId, startTime, endTime, description, participants.add)
		.then(result => {
			res.status(201).json({ data: result.data, message: result.message });
		}).catch(err => {
			console.log(err);
			next(err);
		});
});

/**
 * PATCH /
 * Description: update meeting details
 * 
 * 
 */
router.patch("/:meetingId", auth, validateMeetingTimeInfo, (req, res, next) => {
	let userId = req.userId;
	let meetingId = req.params.meetingId;
	let startTime = req.body.startTime;
	let endTime = req.body.endTime;
	let description = req.body.description;

  	meetingService.updateMeeting(userId, meetingId, startTime, endTime, description).then(result => {
		res.status(200).json({ data: result.data, message: result.message });
	}).catch(err=>{
		console.log(err);
		next(err);
	});
});

/**
 * DELETE /:meetingId/drop
 * Description: delete user from a meeting
 */
router.delete("/:meetingId/drop", auth, (req, res, next) => {
	meetingService.dropMeeting(req.userId, req.params.meetingId)
		.then(result=>{res.json({ message: "deleted from meeting succesfully" });})
		.catch(err=>{
			console.log(err);
			next(err);
		})
	
});

/**
 * GET /:meetingId/join
 * route for joining in the meeting
 * 
 */
router.get("/:meetingId/join", auth, (req, res, next) => {
	let meetingId = req.params.meetingId;
	meetingService.joinMeeting(req.userId, meetingId)
		.then((jwt)=> {
			res.render('meeting.ejs', {meetingRoom: meetingId, jwt: jwt, jitsiAppId: config.get('app.jitsi.appId')})
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
	
});

module.exports = router;
