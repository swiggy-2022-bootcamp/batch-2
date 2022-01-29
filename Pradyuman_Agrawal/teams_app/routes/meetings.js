const meetingRouter = require('express').Router();
const meetings = require("../controllers/meetings.js");

meetingRouter.post("/",meetings.create);
meetingRouter.get("/",meetings.getAllMeeting);
meetingRouter.get("/:id",meetings.findMeetingById);
meetingRouter.get("/withCreatorId/:userId",meetings.findMeetingByCreatorId);
meetingRouter.get("/withMemberId/:userId",meetings.findMeetingByMemberId);
meetingRouter.put("/:id",meetings.updateMeetingById);
meetingRouter.delete("/:id",meetings.deleteMeetingById);
meetingRouter.delete("/dropoff/:id",meetings.dropOffMeetingById);

meetingRouter.get("/creatInviteLink/:id",meetings.createInviteLink);
meetingRouter.get("/joinWithInviteLink/:encryptedMeetingId",meetings.joinMeetingbyId);
module.exports = meetingRouter;