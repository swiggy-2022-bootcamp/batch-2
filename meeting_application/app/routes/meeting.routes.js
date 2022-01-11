const jwt = require("jsonwebtoken");

module.exports = app => {
    const meetings = require("../controllers/meeting.controller.js");
    var router = require("express").Router();


    router.post("/create_meeting/:id",authenticateToken, meetings.createMeeting);
    router.get("/view_meetings/:id", authenticateToken, meetings.viewMeetings);
    router.get("/search_meeting/:id", authenticateToken, meetings.findMeetingById);
    router.put("/drop_from_meeting/:id", authenticateToken, meetings.dropFromMeetingById);

    app.use("/meetings",router)
}

const authenticateToken = (req,res,next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401).send("Access denied")
    }  

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, data)=> {
        if(err) {
            return res.status(403).json("Token is invalid");
        }
        req.user = data;
        next();
    })

}
