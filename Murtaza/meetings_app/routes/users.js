var express = require('express');
var router = express.Router();
const meetingsRouter = require('./meetings');
const UserModel = require('../models/User');

router.use('/:userId/meetings', meetingsRouter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('get all list of users');
});

router.post('/signup', async (req, res)=>{
  console.log(req.body);
  const userDetails = req.body;
  const persistedUserDetails = await UserModel.create(userDetails);
  res.json({status: 'ok', code: 201, message: 'user created successfully', payload: persistedUserDetails});
});

router.post('/login', (req, res)=>{

});

module.exports = router;
