const auth = require("../middleware/auth");


module.exports = app => {
    const vote = require("../controllers/vote.js");
    var router = require("express").Router();

    //votes
    router.get('/upvote/:question/:answer?', auth, vote.upvote);
    router.get('/downvote', auth, vote.downvote);
    router.get('/unvote', auth, vote.unvote);

    app.use("/votes", router)
}
