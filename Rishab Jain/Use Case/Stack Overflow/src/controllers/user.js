const User = require('../models/User');


/** ---------- Post --------------- */

// Sign up new user
exports.createUser = async (req, res) => {
    const { email } = req.body;

    try{
        // Checking if this new user is unique
        const oldUser = await User.findOne({email});

        if(oldUser){
            return res.status(401).send({message: 'Email exists.'});
        }
        
        const user = new User(req.body);
        await user.save();
        
        const token = await user.generateAuthToken();

        res.status(201).send({user, token});
    }catch(err){
        res.status(400).send(err);
    }
};

// Login user
exports.loginUser = async(req, res) => {
    
    const {email, password} = req.body;

    try {
        const user = await User.findByCredentials(email, password);

        const token = await user.generateAuthToken();

        res.status(200).send({
            user,
            token
        });
    }catch(err) {
        res.status(400).send(err);
    }
};

// Log Out User
exports.logOut = async (req, res) => {
    try{
        // since we are logging out we need to delete the token from list
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.status(200).send();
    }catch(err){
        res.status(500).send();
    }
};

// Log out user from all devices
exports.logOutAll = async (req, res) => {
    try{
        // since we are logging out we need to delete the token from list
        req.user.tokens = [];

        await req.user.save();

        res.status(200).send();
    }catch(err){
        res.status(500).send();
    }
};


/** ---------- Get --------------- */

// Get User details (taking help of auth middleware)
exports.getUserDetails = async (req, res) => {

    res.status(200).send(req.user);
};

// Get user by id
exports.findUserById = async (req, res) => {
    
    const _id = req.params.id;
    
    try{
        const user = await User.findById(_id);
        
        if(!user){
            return res.status(404).send();
        }
        
        res.status(200).send({
            user_id: _id,
            user_name: user.name
        });

    }catch(err){
        res.status(500).send();
    }
};

// Get all users
exports.findAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        
        if(!users){
            return res.status(404).send();
        }
        
        res.status(200).send(users);
    }catch(err){
        res.status(500).send();
    }
};