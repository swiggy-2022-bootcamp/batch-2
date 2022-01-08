const Question = require('../models/Question');

// Add a new Question
exports.addQuestion = async (req, res) => {
    const question = new Question(req.body);

    try{
        await question.save();

        res.status(201).send(question);
    }catch(err){
        res.status(400).send(err);
    }
};


// Add an answer
exports.addAnswer = async(req, res) => {

    const _id = req.params.id;
    
    try{
        const question = await Question.findById(_id);
        
        if(!question){
            return res.status(404).send();
        }
        
        question.question_answer.push(req.body);
        
        await question.save();

        res.status(201).send(question);
    }catch(err){
        res.status(500).send();
    }
};

// Show all answers
exports.findAllAnswers = async(req, res) => {
    const _id = req.params.id;

    try{
        const question = await Question.findById(_id);
        
        if(!question){
            return res.status(404).send();
        }

        const answers = question.question_answer;
        
        // question.question_answer.push(req.body);
        
        // await question.save();

        res.status(201).send(answers);
    }catch(err){
        res.status(500).send();
    }
};