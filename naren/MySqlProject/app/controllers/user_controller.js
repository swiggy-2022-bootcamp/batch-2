// FOR QUERYING THE DATABASE
const sql = require("./db.js")

/*

************ CONTROLLER FOR ALL USER RELATED REQUESTS ********************

*/

// USE CASE 1 OF CASE STUDY
// LOGIN INTO APPLICATION
/*

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
const loginUser = (req,res) =>
{
    const userData=
    {       
        userName : req.body.userName,
        password : req.body.password
    }
    const queryString = 'SELECT * FROM UserDetails where userName = ?;';
    sql.query(queryString,userData.userName,(err,result) => 
    {
        if(err)
        {
            console.log("error: ",err)
            res.status(500).send({ message: 'This is an internal server error!'});
        }
        else
        {
            result = JSON.parse(JSON.stringify(result));
            
            if (result.length == 1)
            {
                // user name exists, now check if password exists
                if (result[0].password == userData.password)
                {
                    console.log("SUCCESSFULY LOGGED IN");
                    res.status(200).send({ message: "SUCCESSFULY LOGGED IN"});
                }
                else
                {
                    console.log("Password incorect.Please try again");
                    res.status(401).send({ message: "Password incorect.Please try again"});
                }
        
            }
            else
            {
                console.log("Username NOT YET registered.Please register first");
                res.status(403).send({ message: 'Username NOT YET registered.Please register first'});
            }       
        }
    });   
}


// USE CASE 2 OF CASE STUDY
// CREATE A NEW USER
/*

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
const createUser = (req,res) => 
{
    const userData=
    {       
        registrationName: req.body.registrationName,
        userName : req.body.userName,
        password : req.body.password
    }
    const queryString = 'SELECT * FROM UserDetails where userName = ?;';
    sql.query(queryString,userData.userName,(err,result) => 
    {
        if(err)
        {
            console.log("error: ",err)
            res.status(500).send({ message: 'This is an internal server error!'});
        }
        else
        {
            result = JSON.parse(JSON.stringify(result));
            //console.log(result.length);
            if (result.length == 1)
            {
                console.log("Username already registered.Please choose another");
                res.status(403).send({ message: 'Username already registered.Please choose another'});
        
            }
            else
            {
                console.log("adding the new user");
                const queryString2 = 'INSERT into UserDetails SET ? ; '
                sql.query(queryString2,userData,(err, result) =>
                {
                    if (err) 
                    {
                        console.log("error: ",err)
                        res.status(500).send({ message: 'This is an internal server error!'});
                    }
                    else
                    {
                        console.log("User created Successfully");
                        res.status(201).send({message:"User created Successfully for user "+userData.registrationName+" with email "+ userData.userName });
                    }
                });
            }   
        }   
    });  
}

// EXTRA USE CASE
// DISPLAY ALL USERS , FROM ADMIN SIDE.
/*

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

const listAllUsers = (req,res) =>
{
    sql.query("Select * from UserDetails",(err,result) => 
    {
        if(err)
        {
            console.log("error: ",err)
            res.status(500).send({ message: 'This is an internal server error!'});
        }
        else
        {
            //console.log(JSON.stringify(result));
            res.status(200).send(JSON.stringify(result));
        }       
       
    });
}


// export all these functions.
module.exports = {createUser,listAllUsers,loginUser}




