const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = require('./votes');

const answerSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    created: { type: Date, default: Date.now },
    text: { type: String, required: true },
    votes: [voteSchema]
});


answerSchema.set('toJSON', { getters: true });

module.exports = answerSchema;