const mongoose = require('mongoose');
const UserModel = require('./User.js');

const UserSchema = new mongoose.Schema({
    id: {type: Number, required: false},
    description: {type: String, required: true},
    users: {type: Array(UserModel), required: true}
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const userModel = mongoose.model('Users', UserSchema);
module.exports = userModel;