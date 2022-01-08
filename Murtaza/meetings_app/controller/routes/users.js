var express = require('express');
var router = express.Router();
const meetingsRouter = require('./meetings');
const userService = require('../../domain/services/userService');
const logger = require('../../config/logger');
const util = require('../util');
const auth = require('../auth');

router.use('/:userId/meetings', meetingsRouter);

router.get('/:userId', auth, async (req, res) => {
  let result = await userService.findUserByUserId(req.params.userId);  
  if (result.data) {
    res.status(200);
    res.json({status: 200, data: result.data, message: result.message});
  } else {
    res.status(404);
    res.json({status: 404, data: result.data, message: result.message});
  }
});

router.post('/signup', async (req, res)=>{

  if (!util.isSignUpRequestValid(req.body)) {
    res.json({status: 400, data: {}, message: "Invalid Request Format"});
  }

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

router.post('/login', async (req, res)=>{
  
  if (!util.isLoginRequestValid(req.body)) {
    res.status(400);
    res.json({status: 400, data:{}, message: "Invalid Request Format"});
  }

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
