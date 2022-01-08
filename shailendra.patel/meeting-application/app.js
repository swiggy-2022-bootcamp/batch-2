const express = require('express')
const app = express()
const port = 3000

const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager;
const { authService } = require('./service/authService');
const { meetService } = require('./service/meetingService')

//include middleware
const bodyParser = require("body-parser");

//include my routes
const authRoutes = require("./route/authRoute");


//use the middleware
app.use(bodyParser.json());

//use my routes
app.use("/user", authRoutes);

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  console.log(new Date("2022-01-08").toDateString());
})

const shutdownManager = new GracefulShutdownManager(server);
process.on('SIGINT', () => {
  shutdownManager.terminate(() => {
    authService.writeUsersToJSONFile();
    console.log('Server is gracefully terminated');
  });
});