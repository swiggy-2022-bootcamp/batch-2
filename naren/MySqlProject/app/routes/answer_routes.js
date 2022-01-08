module.exports = app => 
{
    const answers = require("../controllers/answer_controller.js");
    var router = require("express").Router();

    //router.get("/test",questions.testquestion);
    router.post("/addAnswer",answers.postAnswer);
 
    app.use("/answers",router)
}