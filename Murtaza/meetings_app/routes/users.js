var express = require('express');
var router = express.Router();
const meetingsRouter = require('./meetings');

router.use('/:userId/meetings', meetingsRouter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('get all list of users');
});

router.post('/signup', (req, res)=>{

});

router.post('/login', (req, res)=>{

});

module.exports = router;
