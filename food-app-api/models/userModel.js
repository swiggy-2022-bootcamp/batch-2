const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: {
            _id: false,
            houseno: {
                type: Number,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zip: {
                type: Number,
                required: true,
                length: 6
            }
        },
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Users', UserSchema);