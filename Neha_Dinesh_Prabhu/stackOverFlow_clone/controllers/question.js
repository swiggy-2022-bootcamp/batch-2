const Question = require('../models/question');
const User = require('../models/user');

//creat or post a question
exports.createQuestion = async (req, res, next) => {
    try {
        const { title, text } = req.body;
        const author = req.user.user_id;
        const question = await Question.create({
            title,
            author,
            text
        });
        data = { "message": "question created successfully", "details": question }
        res.status(201).json(data);
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

exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).send({
                msg: "Question not found",
            });
        }
        res.status(200).json({
            msg: "Question fetched successfully",
            data: question,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Error fetching question",
        });
    }
};

exports.removeQuestion = async (req, res, next) => {
    try {
        await req.question.remove();
        res.json({ message: 'Your question successfully deleted.' });
    } catch (error) {
        console.log(error)
    }
};


