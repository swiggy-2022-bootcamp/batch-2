const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    id: {type: Number, required: false},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email_address: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    bio: {type: String, required: false},
    meetings: {type: Array, required: false},
    teams: {type: Array, required: false},
    created_at: {type: Number, default: 100},
    updated_at: {type: Number, default: 100},
})

const userModel = mongoose.model('UserModel', UserSchema);
module.exports = userModel;