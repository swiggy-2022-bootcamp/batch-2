const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const env = require("../config/environment.config");

function verifyAddress(address){
    if(address.houseno == undefined || address.street == undefined || 
        address.city == undefined || address.state == undefined || address.zip == undefined){
            return -1;
    }
    return 1;
}

function verifyJWTToken(req){
    jwt.verify(req.token, env.JWT_SECRET_KEY, (err, authData) => {
        if(err){
            return -1;
        }
        return 1;
    });
}

// Create/Add new user
// No auth required for registering
exports.create = (req, res) => {
    const user = new User(req.body);
    //explicitly verify address fields legitimacy 
    if(verifyAddress(req.body.address) == -1){
        res.status(400);
        res.json({
            message: "All fields in address are compulsary"
        });
        return;
    };

    //invocking service/model layer
    user.create(user, (err, result) => {
        if(err){
            //duplicate username is prohibited
            if(err.code == "ER_DUP_ENTRY"){
                res.status(400);
                res.json({
                    message: "Username already taken."
                });
            }
            else if(err.code == "ER_BAD_NULL_ERROR"){
                res.status(400);
                res.json({
                    message: "Fields userName, email, password and address are compulsary"
                });
            }
            else{
                res.sendStatus(500);
                console.log(err);
            }
        }
        else{
            res.status(201);
            res.json({
                result
            });
        }
    });
}

// Authenticate user
exports.authenticate = (req, res) => {
    const user = new User(req.body);
    user.authenticate(user, (err, result) => {
        //invalid credentials
        if(err){
            res.sendStatus(403);
            console.log(err);
        }
        else{
            //convert stringified address obj to json
            result.address = JSON.parse(result.address);
            //jwt shall sign the user object with given uname and password, and return a token which expires in 1 hour
            jwt.sign(result, env.JWT_SECRET_KEY, {expiresIn: 60*60}, (err, token) => {
                res.status(200);
                res.json({
                   //result,
                   message: "User logged in successful",
                   token
                });
            });
        }
    }); 
}

// Get all registered users
exports.getAllUsers = (req, res) => {
    if(verifyJWTToken(req) == -1){
        res.status(403);
        return;
    }
    User.getAllUsers(null, (err, result) => {
        //convert stringified address obj to json
        for(let i = 0; i < result.length; i++){
            result[i].address = JSON.parse(result[i].address);
        }
        res.json(result);
    });
}

// Get user by ID
exports.getUserById = (req, res) => {
    if(verifyJWTToken(req) == -1){
        res.status(403);
        return;
    }
    //extract path param and call model/service layer
    User.getUserById(req.params['userID'], (err, result) => {
        //rare case error
        if(err){
            console.log(err);
            res.status(500);
        }
        else{
        //zero rows fetched - user not found
            if(result.length == 0){
                res.status(404);
                res.json({
                    message: `Sorry, user with id ${req.params['userID']} not found`
                });
            }
            //user found
            else{
                //only one row returned, so flatten it to a variable
                result = result[0];
                //convert stringified address obj to json
                result.address = JSON.parse(result.address);
                res.status(200);
                res.json({
                    result
                });
            }
        }
    });
}

// Update user
exports.updateUser = (req, res) => {
    if(verifyJWTToken(req) == -1){
        res.status(403);
        return;
    }
    const user = new User(req.body);
    User.updateUser(user, req.body, (err, result) => {
        if(err){
            //updated user name is a duplicate
            if(err.code == "ER_DUP_ENTRY"){
                res.status(400);
                res.json({
                    message: "Username already taken."
                });
            }
            //updated userName and/or email and/or password are null/unassigned
            else if(err.code == "ER_BAD_NULL_ERROR" || err.code == "ER_BAD_FIELD_ERROR"){
                res.status(400);
                res.json({
                    message: "Fields userId, userName, email, password are compulsary"
                });
            }
            //some other internal error - rare
            else{
                res.sendStatus(500);
                console.log(err);
            }
        }
        else{
            //no records were updated - user not found
            if(result.affectedRows == 0){
                res.status(404);
                res.json({
                    message: `Sorry, user with id ${req.body['userID']} not found`
                });
            }
            //user updated
            else{
                User.getUserById(req.body['userId'], (err, result) => {
                    //convert stringified address obj to json
                    //only one row returned, so flatten it to a variable
                    result = result[0];
                    result.address = JSON.parse(result.address);
                    res.json({
                        result
                    });
                    res.status(200);
                });
            }
        }
    });
}

//Delete user by Id
exports.deleteUserById = (req, res) => {
    if(verifyJWTToken(req) == -1){
        res.status(403);
        return;
    }
    //extract path param
    User.deleteUserById(req.params['userID'], (err, result) => {
        if(err){
            //wrong data type of userId
            if(err.code == "ER_TRUNCATED_WRONG_VALUE"){
                res.status(400);
                res.json({
                    message: "userId must be a integer"
                });
                return;
            }
        }
        else{
            //rows affected are zero - user not found
            if(result.affectedRows == 0){
                res.status(404);
                res.json({
                    message: `Sorry, user with id ${req.params['userID']} not found`
                });
            }
            //deletion successfull
            else{
                res.status(200);
                res.json({
                    message: `User deleted successfully`
                });
            }
        }
    });
}
