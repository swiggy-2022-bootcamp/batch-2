module.exports = app => 
{
    const answers = require("../controllers/answer_controller.js");
    var router = require("express").Router();

    //router.get("/test",questions.testquestion);
    router.post("/addAnswer",answers.postAnswer);
    router.put("/updateAnswer",answers.updateAnswer);
    router.post("/upvoteAnswer/:id",answers.upvoteAnswer);
    router.get("/getPrivilegedUsers",answers.getPrivilegedUsers);
    router.get("/upvoteCount",answers.getVoteCountOfAnswers);
 
    app.use("/answers",router)
}