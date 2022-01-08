module.exports = app => {
    const questions = require("../controllers/question_controller.js");
    var router = require("express").Router();

    router.get("/test",questions.testquestion);
    router.post("/addquestion",questions.postQuestion);
 
    

    app.use("/questions",router)
}