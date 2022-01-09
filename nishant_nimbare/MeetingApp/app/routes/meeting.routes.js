const meetingRouter = require("express").Router();
const authController = require("../controllers/auth.controller");
const meetingController = require("../controllers/meeting.controller");

//verfiy token
meetingRouter.use(authController.verifyUser);

meetingRouter.post("/", meetingController.createMeeting);
meetingRouter.get("/",  meetingController.searchMeetings);
meetingRouter.get("/:meeting_id",  meetingController.getMeeting);
meetingRouter.delete("/:meeting_id", meetingController.declineMeeting);

module.exports = meetingRouter;