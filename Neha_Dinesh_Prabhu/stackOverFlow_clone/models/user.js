
const Mail = require('mongoose-type-email');
const mongoose = require("mongoose");


const userModel = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: Mail, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    token : {type: String}
});

userModel.set('toJSON', { getters: true });
userModel.options.toJSON.transform = (doc, ret) => {
    const obj = { ...ret };
    delete obj.__v;
    delete obj._id;
    delete obj.email;
    delete obj.password;
    return obj;
};


module.exports = mongoose.model('user', userModel);