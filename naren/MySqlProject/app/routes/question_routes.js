module.exports = app => {
    const questions = require("../controllers/question_controller.js");
    var router = require("express").Router();

    router.get("/test",questions.testquestion);
    router.post("/addQuestion",questions.postQuestion);
 
    app.use("/questions",router)
}