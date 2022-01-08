const mongoose = require('mongoose');

var user = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    password: { type: String, required: true },
    group: { type: Boolean, default: false },
    members: [String] // array of emails
}, {
    strict: false,
});

module.exports = mongoose.model('user', user);