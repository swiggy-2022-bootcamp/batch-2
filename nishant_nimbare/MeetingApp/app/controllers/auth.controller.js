const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../config/server.config");

exports.sendToken = (req, res) => {

    jwt.sign({ id: res.locals.user._id }, jwtSecret, (err, token) => {

        if (err) return res.send({ 'error signing cookie': err });

        res.status(201).send({
            ...res.locals.user,
            token
        });
    });
}

exports.verifyUser = (req, res, next) => {

    console.log(' req.path', req.path);

    let token = req.headers['token'];

    if (!token) return next(new Error("Token not found in header"));

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) next(err);
        console.log('decoded ', decoded);
        res.locals._id = decoded._id;
        next();
    });
}