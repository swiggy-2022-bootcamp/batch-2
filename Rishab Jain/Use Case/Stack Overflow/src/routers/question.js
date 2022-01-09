const express = require('express');
const questions = require('../controllers/question');
const auth = require('../middleware/auth');

const router = new express.Router();

// Add a new question
router.post('/add_question', auth, questions.addQuestion);

// Add answer to question by id
router.post('/add_answer/:id', auth, questions.addAnswer);

// Read all questions
router.get('/read_all_questions', questions.findAllQuestions);

// Read question by id
router.get('/read_question/:id', questions.findQuestionById);

// Read answers by question id
router.get('/read_answers/:id', questions.findAllAnswers);

// Delete answer
router.delete('/delete_answer', auth, questions.deleteAnswer);

// Delete question by id
router.delete('/delete_question/:id', auth, questions.deleteQuestionById);

// Update answer by id
router.patch('/update_answer', auth, questions.updateAnswerById);

module.exports = router;