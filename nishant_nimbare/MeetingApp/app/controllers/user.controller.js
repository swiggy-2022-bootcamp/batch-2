const User = require("../models/user.model");
const userUtils = require("../utils/user.utils");
const { makeErr } = require("../utils/error.utils");
const { MongoError } = require('mongodb');

exports.register = async (req, res, next) => {
    let { email, name, password } = req.body;

    try {
        if(!password) throw makeErr("Password not found", 400);

        let newUser = await User.create({
            email,
            name,
            password: await userUtils.encrypt(password),
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
            return next(makeErr('Email already exist', 400));
        }
        next(err);
    }

}

exports.login = async (req, res, next) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).lean();
        if (!user) {
            throw makeErr("User Email not found", 401);
        }

        if (!(await userUtils.comparehash(password, user.password))) {
            throw makeErr("Incorrect password", 401);
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