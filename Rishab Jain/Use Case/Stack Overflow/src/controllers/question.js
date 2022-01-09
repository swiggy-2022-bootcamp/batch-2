const Question = require('../models/Question');


/** ---------- Post --------------- */

// Add a new Question
exports.addQuestion = async (req, res) => {
    try{

        const question = new Question({
            ...req.body,
            question_user_id: req.user._id,
            question_user_name: req.user.name
        });

        await question.save();

        res.status(201).send({
            ...question, 
            message : "Question posted successfully"
        });

    }catch(err){
        res.status(400).send(err);
    }
};


// Add an answer to a question by id
exports.addAnswer = async(req, res) => {

    const _id = req.params.id;
    
    try{
        const question = await Question.findById(_id);
        
        if(!question){
            return res.status(404).send();
        }
        
        const answer = {
            ...req.body,
            answer_user_id: req.user._id,
            answer_user_name: req.user.name
        }

        question.question_answers.push(answer);
        
        await question.save();

        res.status(201).send({
            ...answer,
            message: "Answer posted successfully"
        });
    }catch(err){
        res.status(500).send();
    }
};



/** ---------- Get --------------- */

// Show all questions and answers
exports.findAllQuestions = async (req, res) => {
    
    try{
        const questions = await Question.find({});

        res.status(200).send(questions);
    }catch(err){
        res.status(500).send();
    }
}

// Show a question by id
exports.findQuestionById = async(req, res) => {
    const _id = req.params.id;

    try{
        const question = await Question.findById(_id);
        
        if(!question){
            return res.status(404).send();
        }

        res.status(201).send(question);
    }catch(err){
        res.status(500).send();
    }
};

// Show all answers of a question by id
exports.findAllAnswers = async(req, res) => {
    const _id = req.params.id;

    try{
        const question = await Question.findById(_id);
        
        if(!question){
            return res.status(404).send();
        }

        const answers = question.question_answers;

        res.status(201).send(answers);
    }catch(err){
        res.status(500).send();
    }
};


/** ---------- Update --------------- */

// update an answer by id
exports.updateAnswerById = async(req, res) => {
    const user_id = req.user.id;
    const question_id = req.body.question_id;
    const answer_id = req.body.answer_id;

    try{
        const question = await Question.findById(question_id);

        if(!question){
            return res.status(404).send({message: "Question don't exist"});
        }

        const answers = question.question_answers;
        const idx = answers.findIndex((answer) => answer._id.toString() === answer_id.toString());

        if(idx == -1){
            return res.status(404).send({message: "Answer don't exist"});
        }

        if(answers[idx].answer_user_id.toString() !== user_id.toString()){
            return res.status(401).send({message: "You are not the author of the answer"});
        }

        answers[idx].answer_user_ans = req.body.new_answer;

        await question.save();

        res.status(200).send(answers[idx]);
    }catch(err){
        res.status(500).send();
    }

};

/** ---------- Delete --------------- */

// delete an answer by id
exports.deleteAnswer = async(req, res) => {    
    const user_id = req.user.id;
    const question_id = req.body.question_id;
    const answer_id = req.body.answer_id;

    try{
        const question = await Question.findById(question_id);

        if(!question){
            return res.status(404).send({message: "Question don't exist"});
        }

        const answers = question.question_answers;
        const newAnswers = answers.filter((answer) => {
            if(answer.answer_user_id.toString() !== user_id.toString() && answer._id.toString() !== answer_id.toString()){
                return true;
            }
        });

        question.question_answers = newAnswers;

        await question.save();

        res.status(200).send(question);
    }catch(err){
        res.status(400).send();
    }
};


// delete a question by id
exports.deleteQuestionById = async(req, res) => {    
    const question_id = req.params.id;

    try{
        const question = await Question.findByIdAndDelete(question_id);

        if(!question){
            return  res.status(404).send({message: "Question don't exist"});
        }

        res.status(200).send();
    }catch(err){
        res.status(500).send();
    }
};
