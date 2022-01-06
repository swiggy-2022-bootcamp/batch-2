const User = require('../model/User');
const { validationResult } = require('express-validator');
const { authService } = require('../service/authService');


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
    res.status(201).json({
        message: "User Registered Succesfully",
        userDetails: user
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

    res.status(200).json({
        message: "User Logged In Succesfully",
        emailId: emailId
    });
}
