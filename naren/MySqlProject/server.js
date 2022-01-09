/*
 This file is the ENTRY point of the back end application.
 We import all the necessary modules.
 We intialise the Express server and set it to a variable called app.
 Body parser is required for parsing the JSON input made in Postman Client.
 The server is listening on PORT 8080 for requests from the client
 We also import local modules from routes folder,to accept requests from all the 
 corresponding end points.
 The express middleware provides access to the req(request) and res(response) of our REST service.
*/

const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = { origin:"*" };

app.use(cors(corsOptions));
app.use(express.json());

require("./app/routes/user_routes")(app);
require("./app/routes/question_routes")(app);
require("./app/routes/answer_routes")(app);

const PORT = 8080;
app.listen(PORT,() => 
{
    console.log(`Server running on port: ${PORT}`);
});