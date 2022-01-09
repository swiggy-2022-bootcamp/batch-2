const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    "username": {
        type: String,
        required: true,
        unique: true
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "token": { type: String },
    "address": {
        "houseno": String,
        "street": String,
        "city": String,
        "state": String,
        "zip": Number,
    }
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema);