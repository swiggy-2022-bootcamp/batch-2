var express = require('express');
var router = express.Router();
const meetingsRouter = require('./meetings');
const userService = require('../../domain/services/userService');
const logger = require('../../config/logger');
const util = require('../util');

router.use('/:userId/meetings', meetingsRouter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('get all list of users');
});

router.post('/signup', async (req, res)=>{

  if (!util.isSignUpRequestValid(req.body)) {
    res.json({status: 400, data: {}, message: "Invalid Request Format"});
  }

  const userDomainEntity = req.body;

  const response = await userService.createUserIfNotExists(userDomainEntity)
    .then(result => {
      res.cookie("auth-token", result.cookie, {httpOnly: true});
      return {status: 201, data: result.data, message: result.message};    
    })
    .catch(err => {
      return {status: 400, data: err, message: "Failed to create user"};
    });

  res.json(response);
});

router.post('/login', async (req, res)=>{
  
  if (!util.isLoginRequestValid(req.body)) {
    res.json({status: 400, data:{}, message: "Invalid Request Format"});
  }

  const username = req.body.username;
  const password = req.body.password;
  const response = await userService.authenticateUser(username, password)
    .then(result => {
      console.log(result.cookie);
      if (result.isLoggedin == true) {
        res.cookie("auth-token", result.cookie, {httpOnly: true});
        return {status: 200, message: result.message};
      } else {
        return {status: 403, message: result.message};
      }
    })
    .catch(err => {
      return {status: 500, message: err.message};
    });
  
  res.json(response);
});

module.exports = router;
