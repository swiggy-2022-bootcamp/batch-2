const query = require('../db/query');
const dbName = "swiggy_bootcamp.users";
const bcrypt = require('bcryptjs');



// middleware to validate inputs
const validateInputs = (req, res, next) => {
    const fields = ['userid', 'username', 'email', 'password', 'address'];
    const userDetails = req.body;

    for(let i = 0; i < fields.length; i++){
        fieldName = fields[i];

        if(!userDetails.hasOwnProperty(fieldName) || userDetails[fieldName].length === 0) {
            res.status(400).json({
                status : 400,
                error : `${fieldName} empty`
            });

            return;
        }
    }

    next();

}

const checkIfUserExists = async (req, res, next) => {
    
    const userDetails = req.body;
    const userid = userDetails.userid;

    let userExists = false;
    const sql = `SELECT userid FROM ${dbName} WHERE userid = '${userid}'`;


    try{
        const result = await query(sql);
        console.log(result);
        if (result.length > 0)
            userExists = true;
    }
    catch(err){
        console.log(err);
    }
    

    if (userExists){
        res.status(403).json({
            status : 403,
            message : `UserID already exists : ${userid}`
        });
        return;
    }


    next();
} 

const generatePasswordHash = async (req, res, next) => {
    const userDetails = req.body;
    const saltRounds = 10;
    const password = userDetails.password;

    const hash = await bcrypt.hash(password, saltRounds);
    userDetails.password = hash;

    next();
}


const registerUser = async (req, res) => {
    const userDetails = req.body;
    // console.log(userDetails);

    const sql = `INSERT INTO swiggy_bootcamp.users VALUES ('${userDetails.userid}', '${userDetails.username}', '${userDetails.email}', '${userDetails.password}', ${userDetails.address.houseno}, '${userDetails.address.street}', '${userDetails.address.city}', '${userDetails.address.state}', '${userDetails.address.zip}');`;


    try{
        await query(sql);
        console.log("Done inserting user");
        res.status(201).json({
            status : 201,
            message : "User registered",
            data : userDetails
        });
        
    }
    catch(err){
        console.log(err.sqlMessage);
        res.status(403).json({
            status : 403,
            error : err.sqlMessage
        });
    }

}


module.exports = {registerUser, validateInputs, generatePasswordHash, checkIfUserExists, validateInputs}