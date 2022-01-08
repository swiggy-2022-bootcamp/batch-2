const User = require('../models/User');

// Sign up new user
exports.createUser = async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();

        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
};

// Fetch all users
exports.findAllUsers = async (req, res) => {

    try{
        const users = await User.find({});

        res.status(200).send(users);
    }catch(err){
        res.status(500).send();
    }
};

exports.findUserById = async (req, res) => {
    
    const _id = req.params.id;
    
    try{
        const user = await User.findById(_id);
        
        if(!user){
            return res.status(404).send();
        }
        
        res.status(200).send(user);
    }catch(err){
        res.status(500).send();
    }
};