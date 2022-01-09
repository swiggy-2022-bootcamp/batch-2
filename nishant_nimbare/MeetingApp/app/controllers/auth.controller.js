const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../config/server.config");
const { makeErr } = require("../utils/error.utils");
const User = require("../models/user.model");

exports.sendToken = (req, res) => {

    jwt.sign({ _id: res.locals.user._id, email: res.locals.user.email }, jwtSecret, (err, token) => {

        if (err) return res.send({ 'error signing cookie': err });

        res.status(res.locals.statusCode || 201).send({
            ...res.locals.user,
            token
        });
    });
}

exports.verifyUser = (req, res, next) => {

    console.log(' req.path', req.path);

    let token = req.headers['token'];

    if (!token) return next(makeErr("Token not found in header", 401));

    jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) return next(makeErr("Invalid token", 401));
        console.log('decoded ', decoded);
        let user = await User.findById(decoded._id).lean();
        if(!user){
           return next(makeErr("User not found", 401));
        }
        res.locals.user = user
        next();
    });
}