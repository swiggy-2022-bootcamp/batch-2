// Establishing DataBase connection
const db = require("../database/db.js")
const dbConnection= db.getDbConnection()

/*

************ CONTROLLER FOR ALL USER RELATED REQUESTS ********************

*/

// QUERY STRINGS FOR THIS CONTROLLER
const getUserQueryString = "SELECT * FROM UserDetails WHERE userName = ?;";
const insertUserQueryString = "INSERT into UserDetails SET ? ;";
const getAllUsersQueryString = "SELECT * from UserDetails;";

/*
USE CASE 1 OF CASE STUDY: LOGIN INTO APPLICATION

Function : loginUser

API TYPE : POST REQUEST

Description : 
It serves the POST request made from the client for logging into the 
application. We check the database,if a user has entered correct 
credentials and respond with a success message.

Input parameters :
From the request we get,
1) userName - Email Id of the user
2) password - password of the user

Response of the API with HTTP STATUS codes:
200: "SUCCESSFULLY logged in"
401: "PASSWORD INCORRECT for given user name"
403: "UserName not REGISTERED YET. Please register first"
500: "Internal Server Error "

*/

const loginUser = async (req,res) =>
{
    const userData=
    {       
        userName : req.body.userName,
        password : req.body.password
    };

    try
    {
        var userDetail = await dbConnection.query(getUserQueryString, userData.userName); 
        userDetail = JSON.parse(JSON.stringify(userDetail));
        if (userDetail.length == 1)
        {
            if (userDetail[0].password == userData.password)
            {
                res.status(200).send({message: "SUCCESSFULY LOGGED IN"});
            }
            else
            {
                res.status(401).send({message: "Password incorect.Please try again"});
            }
            return;
        }
        res.status(403).send({message: "Username NOT YET registered.Please register first"});
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    }
}

/*
USE CASE 2 OF CASE STUDY: CREATE A NEW USER

Function : creatUser

API TYPE : POST REQUEST

Description : 
It serves the POST request made from the client for creating a new
user. We check the database,if the user email has already been registered.
If not we create the new user.

Input parameters :
From the request we get,
1)registrationName - name of the user
2) userName - Email Id of the user
3) password - password of the user

Response of the API with HTTP STATUS codes:
201: "SUCCESSFULLY added the new user"
403: "UserName already REGISTERED. Please choose another"
500: "Internal Server Error "

*/

const createUser = async (req,res) =>
{
    const userData =
    {       
        registrationName: req.body.registrationName,
        userName : req.body.userName,
        password : req.body.password
    };

    try
    {
        var userDetail = await dbConnection.query(getUserQueryString, userData.userName); 
        if (userDetail.length == 1)
        {
            res.status(403).send({message: "Username already registered. Please choose another"});
            return;
        }
        await dbConnection.query(insertUserQueryString, userData); 
        res.status(201).send({message: "User created Successfully"});
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    }    
}

/*
EXTRA USE CASE : DISPLAY ALL USERS , FROM ADMIN SIDE.

Function : listAllUsers

API TYPE : GET REQUEST

Description : 
It serves the GET request made from the client for 
listing all users. This request is usually only for the admin
of the application on the server side. We dont want a client
seeing all the users. 

Input parameters : NONE

Response of the API with HTTP STATUS codes:
200: "The users listed in JSON FORMAT")
500: "Internal Server Error "

*/

const listAllUsers = async (req,res) =>
{ 
    try
    {
        var userDetails = await dbConnection.query(getAllUsersQueryString);
        res.status(200).send(JSON.stringify(userDetails)); 
    }
    catch (err)
    {
        res.status(500).send({message: "This is an internal server error!"});
    }    
}

// Export the functions
module.exports = {createUser,loginUser,listAllUsers}