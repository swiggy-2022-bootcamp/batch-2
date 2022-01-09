module.exports = app => {
    const questions = require("../controllers/test_question_controller.js");
    var router = require("express").Router();

    router.post("/getAllAnswersForQuestion/:id",questions.getAllAnswersForQuestion);
    router.post("/addQuestion",questions.postQuestion);
    router.get("/getAllQuestionsAndAnswers",questions.getAllQuestionsAndAnswers)
 
    app.use("/questions",router)
}