const User = require('../model/User');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');
const { authService } = require('../service/authService');


const tokenSecret = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

function generateAccessToken(username) {
    return jwt.sign({userId: username}, tokenSecret, { expiresIn: '2h' });
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) 
        return res.status(401).json({error: "Missing Auth Header"});
    
    jwt.verify(token, tokenSecret, (err, user) => {
        // console.log(err)
        if (err) return res.status(403).json({
            msg: "Unauthorized, Invalid token",
            error: err
        });
        req.body.userId = user.userId
        // console.log(req.userId);
        next()
        });
}

exports.signup = (req,res) => {

    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        })
    }
    const user = Object.assign(new User(), req.body);
    
    if(authService.addUser(user) == false){
        return res.status(400).json({
            err: `User with email id ${user.emailId} already registered`
        });
    }
    const token = generateAccessToken(user.getUserId);

    res.status(201).json({
        message: "User Registered Succesfully",
        userDetails: user,
        access_token: token
    });
}

exports.signin = (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        })
    }

    const emailId = req.body.emailId;
    const password = req.body.password;
    if(authService.isValidUser(emailId, password) == false){
        return res.status(401).json({
            err: `Invalid username or password`
        });
    }

    const token = generateAccessToken(emailId);

    res.status(200).json({
        message: "User Logged In Succesfully",
        emailId: emailId,
        access_token: token
    });
}
