const mongoose = require('mongoose');

const questionSchema = {
    question_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    question_user_name: {
        type: String,
        required: true,
    },
    question_title: {
        type: String,
        required: true,
    },
    question_body: {
        type: String,
        required: true,
    },
    question_answers:[
        {   
            answer_user_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            answer_user_name: {
                type: String,
                required: true,
            },
            answer_user_ans: {
                type: String,
                required: true,
            }
        },
    ],
}

// Defining Question Model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;