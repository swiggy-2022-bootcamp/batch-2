var express = require('express');
var router = express.Router();
const meetingsRouter = require('./meetings');
const userService = require('../../services/userService');
const logger = require('../../config/logger');
const requestValidator = require('../validator');
const auth = require('../auth');

router.use('/meetings', meetingsRouter);

router.get('/', auth, async (req, res) => {
  let result = await userService.findUserByUserId(res.locals.userId);  
  if (result.data) {
    res.status(200);
    res.json({status: 200, data: result.data, message: result.message});
  } else {
    res.status(404);
    res.json({status: 404, data: result.data, message: result.message});
  }
});

router.post('/signup', requestValidator.validateSignUpRequest, async (req, res)=>{
  const userDomainEntity = req.body;
  const response = await userService.createUserIfNotExists(userDomainEntity)
    .then(result => {
      res.cookie("auth-token", result.cookie, {httpOnly: true});
      res.status(201);
      return {status: 201, data: result.data, message: result.message};    
    })
    .catch(err => {
      res.status(400);
      return {status: 400, data: err, message: "Failed to create user"};
    });

  res.json(response);
});

router.post('/login', requestValidator.validateLoginRequest, async (req, res)=>{  
  const username = req.body.username;
  const password = req.body.password;
  const response = await userService.authenticateUser(username, password)
    .then(result => {
      console.log(result.cookie);
      if (result.isLoggedin == true) {
        res.cookie("auth-token", result.cookie, {httpOnly: true});
        res.status(200);
        return {status: 200, message: result.message};
      } else {
        res.status(403);
        return {status: 403, message: result.message};
      }
    })
    .catch(err => {
      res.status(500);
      return {status: 500, message: err.message};
    });
  
  res.json(response);
});

module.exports = router;
