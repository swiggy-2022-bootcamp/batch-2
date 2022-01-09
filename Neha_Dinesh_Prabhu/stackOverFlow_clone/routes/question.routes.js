const auth = require('../middleware/auth');
const questionAuth = require('../middleware/questionAuth');

module.exports = app => {
    const questions = require("../controllers/question.js");
    var router = require("express").Router();

    router.get('/id', [auth], questions.getQuestionById);
    router.post('/', [auth], questions.createQuestion);
    router.get('/all-answers/:id', [auth], questions.getAllAnswers);
    router.delete('/:question', [auth], questions.removeQuestion);

    app.use('/questions', router);
}