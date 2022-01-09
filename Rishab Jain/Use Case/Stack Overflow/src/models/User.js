const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');

// Creating User Schema
const userSchema = new mongoose.Schema({
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
        unique: true,
        async validate(value){
            // checking if email is correct
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true
});


// statics are used for the whole model
// methods are used for specific object/instance of the model

// Custom method used for generating user specific token
userSchema.methods.generateAuthToken = async function(){
    const user = this;

    const secret = "stackoverflowapi"
    const token = jwt.sign({ _id: user.id.toString() }, secret);

    user.tokens = user.tokens.concat({ token });
    
    await user.save();

    return token;
};

// sending only relevant data back
// whenever res.send() is used express uses JSON.stringify()
// and toJSON is called even before it
// so here we are just overriding the toJSON() method
userSchema.methods.toJSON = function(){
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// Custom static method used for checking login details
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user){
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error("Unable to login");
    }

    return user;
};

// Setting mongoose middleware for hashing passwords before saving
userSchema.pre('save', async function (next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Defining User Model
const User = mongoose.model('User', userSchema);

module.exports = User;