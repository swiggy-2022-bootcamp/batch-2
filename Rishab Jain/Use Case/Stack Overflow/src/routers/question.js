const express = require('express');
const questions = require('../controllers/question');

const router = new express.Router();

router.post('/add_question', questions.addQuestion);

router.post('/add_answer/:id', questions.addAnswer);

router.get('/show_answers/:id', questions.findAllAnswers);

module.exports = router;