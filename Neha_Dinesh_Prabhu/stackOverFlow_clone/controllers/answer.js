const Answer = require('../models/answer');
const Question = require('../models/question');
const User = require('../models/user');

exports.createAnswer = async (req, res, next) => {
    try {
        const id = req.user.user_id;
        const { text, question_id } = req.body;
        const question = await Question.findById(question_id);
        //console.log(question);
        const quest = await question.addAnswer(id, text);
        //console.log(quest);
        res.status(201).json(question);
    } catch (error) {
        next(error);
    }
};
exports.getAllAnswers = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question.answers) return res.json({ message: 'Answer not found.' });
        data = { "msg": "answers found", "details": question.answers }
    } catch (error) {
        if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid question id.' });
        return next(error);
    }
    next();
};
