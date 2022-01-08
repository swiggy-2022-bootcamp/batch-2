const User = require("../models/user.model");
const userUtils = require("../utils/user.utils");

// in your service file
const { MongoError } = require('mongodb')

exports.register = async (req, res, next) => {
    let { email, name, password } = req.body;

    try {
        let newUser = await User.create({
            email,
            name,
            password: userUtils.encrypt(password),
        });

        res.locals.user = {
            email: newUser.email,
            name: newUser.name,
            _id: newUser._id
        };
        next();
    } catch (err) {
        if (err instanceof MongoError && err.code === 11000) {
            // mongo duplication err, thrown when email is already in use
            res.locals.status = 401;
            return next(new Error('Email already exist'));
        }
        next(err);
    }

}

exports.login = async (req, res, next) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).lean();
        if (!user) {
            res.locals.status = 401;
            throw new Error("User Email not found");
        }

        if (user.password !== userUtils.encrypt(password)) {
            res.locals.status = 401;
            throw new Error("Incorrect password");
        }


        res.locals.user = {
            email: user.email,
            name: user.name,
            _id: user._id
        };
        next();
    } catch (err) {
        next(err);
    }
}