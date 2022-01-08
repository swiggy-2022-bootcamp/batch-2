const mongoose = require('mongoose');

var meeting = mongoose.Schema({
    name: String,
    description: String,
    created_by: { type: String, required: true }, //email
    from: { type: Date, required: true },
    end: { type: Date, required: true },
    participants: [String]
}, {
    strict: false,
});

module.exports = mongoose.model('meeting', meeting);