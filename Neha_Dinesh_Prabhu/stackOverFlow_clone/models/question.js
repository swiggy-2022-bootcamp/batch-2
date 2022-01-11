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

questionSchema.methods = {
    addAnswer: function (author, text) {
        this.answers.push({ author, text });
        return this.save();
    },

    removeAnswer: function (id) {
        const answer = this.answers.id(id);
        console.log(answer);
        if (!answer) throw new Error('Answer not found');
        answer.remove();
        return this.save();
    }
};
module.exports = mongoose.model('question', questionSchema);