const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = require('./votes');
const answerSchema = require('./answer');

const questionSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: { type: String, required: true },
    text: { type: String, required: true },
    votes: [voteSchema],
    answers: [answerSchema],
    created: { type: Date, default: Date.now }
});

questionSchema.set('toJSON', { getters: true });

questionSchema.options.toJSON.transform = (doc, ret) => {
    const obj = { ...ret };
    delete obj._id;
    delete obj.__v;
    return obj;
};
module.exports = mongoose.model('Question', questionSchema);