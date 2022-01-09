const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // Unauthorized response
        return res.status(401).send({ sucess: false, msg: "Token required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({ sucess: false, msg: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;