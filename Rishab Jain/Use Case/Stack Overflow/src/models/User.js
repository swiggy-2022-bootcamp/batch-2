const mongoose = require('mongoose');
const validator = require('validator');

// Deifining User Model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            let isEmail = validator.isEmail(value);
            if(!isEmail){
                throw new Error('Email is Invalid.'); 
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        vaildate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Use a better password.')
            }
        }
    }
});

module.exports = User;