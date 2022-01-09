
// This defines the endpoints used to respond to requests related to answers.

module.exports = app => 
{
    const answers = require("../controllers/test_answer_controller.js");
    const router = require("express").Router();
    
    router.put("/updateAnswer", answers.updateAnswer);
    router.post("/addAnswer", answers.postAnswer);
    router.post("/upvoteAnswer/:id", answers.upvoteAnswer);
    //router.get("/getPrivilegedUsers", answers.getPrivilegedUsers);
    //router.get("/upvoteCount", answers.getVoteCountOfAnswers);
    //router.delete("/deleteAnswer/:id", answers.deleteAnswer);
    
    app.use("/answers",router)
}