
const db = require("../database/db.js")
const dbConnection= db.getDbConnection()

const createUser = async (req,res) =>
{
    const userData =
    {       
        registrationName: req.body.registrationName,
        userName : req.body.userName,
        password : req.body.password
    }
    const getUserQueryString = "SELECT * FROM UserDetails where userName = ?;";
    const insertUserQueryString = "INSERT into UserDetails SET ? ; ";
    try
    {
    userDetail = await dbConnection.query(getUserQueryString,userData.userName); 
    userDetail = JSON.parse(JSON.stringify(userDetail));
    if (userDetail.length == 1)
    {
        console.log("Username already registered. Please choose another");
        res.status(403).send({ message: "Username already registered. Please choose another"});
        return;
    }
    await dbConnection.query(insertUserQueryString,userData) 
    console.log("User created Successfully");
    res.status(201).send({message:"User created Successfully " });
    }
    catch(err)
    {
        console.log("error: ",err)
        res.status(500).send({ message: 'This is an internal server error!'});
    }    
}

module.exports= {createUser}