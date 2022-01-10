module.exports = app => {
    const meetings = require("../controllers/meeting.controller.js");
    var router = require("express").Router();


    router.post("/create_meeting/:id",meetings.createMeeting);
    router.get("/view_meetings/:id",meetings.viewMeetings);
    router.get("/search_meeting/:id",meetings.findMeetingById);


    // router.delete("/delete_user_by_id/:id",users.deleteUserById);

    app.use("/meetings",router)
}