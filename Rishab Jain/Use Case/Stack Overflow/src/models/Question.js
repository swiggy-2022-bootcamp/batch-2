const mongoose = require('mongoose');

// Deifining Question Model
const Question = mongoose.model('Question', {
    question_title: {
        type: String,
        required: true,
    },
    question_body: {
        type: String,
        required: true,
    },
    question_answer:[
        {   
            user_id: {
                type: String,
                required: true,
            },
            user_name: {
                type: String,
                required: true,
            },
            user_answer: {
                type: String,
                required: true,
            }
        },
    ],
});

module.exports = Question;