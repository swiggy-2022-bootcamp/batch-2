const User = require('../model/User');
const { validationResult } = require('express-validator');
const { authService } = require('../service/authService')


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
    res.json(user);
}
