const mongoose = require('mongoose');

var user = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    password: { type: String},
    isGroup: { type: Boolean, default: false},
    admin: String,
    members: [String] // array of emails
}, {
    strict: false,
});

module.exports = mongoose.model('user', user);