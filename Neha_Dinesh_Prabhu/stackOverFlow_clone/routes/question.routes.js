const auth = require('../middleware/auth');
const questionAuth = require('../middleware/questionAuth');

module.exports = app => {
    const questions = require("../controllers/question.js");
    var router = require("express").Router();

    router.get('/', [auth], questions.getQuestionById);
    router.get('/all', [auth], questions.listQuestions);
    router.get('/user', questions.listByUser);
    router.post('/', [auth], questions.createQuestion);
    router.get('/all-answers', [auth], questions.getAllAnswers);
    router.delete('/', [auth], questions.removeQuestion);

    app.use('/questions', router);
}