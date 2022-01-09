const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'stackoverflowapi');

        const user = await User.findOne({ 
            _id: decoded._id,
            'tokens.token' : token
        });

        if(!user){
            throw new Error()
        }

        // adding user and token to request so that route handler don't have to access the user again
        req.token = token;
        req.user = user;

        next();
    }catch(err){
        res.status(404).send({message: "Please authenticate"});
    }
};

module.exports = auth;