const meetingRouter = require('express').Router();
const meetings = require("../controllers/meetings.js");

meetingRouter.post("/",meetings.create);
meetingRouter.get("/",meetings.getAllMeeting);
meetingRouter.get("/:id",meetings.findMeetingById);
meetingRouter.get("/withCreatorId/:id",meetings.findMeetingByCreatorId);
meetingRouter.get("/withMemberId/:id",meetings.findMeetingByMemberId);
meetingRouter.put("/:id",meetings.updateMeetingById);
meetingRouter.delete("/:id",meetings.deleteMeetingById);
meetingRouter.delete("/dropoff/:id",meetings.dropOffMeetingById);

module.exports = meetingRouter;