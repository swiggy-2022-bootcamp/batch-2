var express = require('express');
var router = express.Router({mergeParams: true});

/* GET meetings listing. */
router.get('/', function(req, res, next) {
  res.send(`Here's all meetings for user id: ${req.params.userId}`);
});

router.post('/', function(req, res, next) {
    res.send("creating a new meeting");
});

router.get('/search', (req, res)=>{
    res.send(`Searching for meeting based on description: ${req.query.description}, between ${req.query.from} and ${req.query.to}`);
});

module.exports = router;
