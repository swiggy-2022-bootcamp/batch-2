const express = require('express');
const questions = require('../controllers/question');
const auth = require('../middleware/auth');

const router = new express.Router();

// Add a new question
router.post('/add_question', auth, questions.addQuestion);

// Add answer to question by id
router.post('/add_answer/:id', auth, questions.addAnswer);

// Show questions
router.get('/show_all_questions', questions.findAllQuestions);

// Show answers by id
router.get('/show_answers/:id', questions.findAllAnswers);

// Delete answer
router.delete('/delete_answer', auth, questions.deleteAnswer);

// Delete question by id
router.delete('/delete_question/:id', auth, questions.deleteQuestionById);

// Update answer by id
router.patch('/update_answer', auth, questions.updateAnswerById);

module.exports = router;