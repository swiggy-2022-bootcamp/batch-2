const userRouter = require("./user.routes");
const meetingRouter = require("./meeting.routes");
const groupRouter = require("./groups.routes");
const { globalErrorHandler } = require("../utils/error.utils");

module.exports = app => {

    app.use("/user", userRouter);
    app.use("/meetings", meetingRouter);
    app.use("/groups", groupRouter);
    app.get("/ping", (req, res) => res.send("Pong"));

    //global error handler
    app.use(globalErrorHandler)

    console.log("initialized routes");
}