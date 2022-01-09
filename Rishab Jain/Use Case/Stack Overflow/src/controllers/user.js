const User = require('../models/User');

// Sign up new user
exports.createUser = async (req, res) => {
    try{
        const { email } = req.body;
        
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
    try {
        const {email, password} = req.body;

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

// Read User details
exports.findAllUsers = async (req, res) => {

    res.status(200).send(req.user);
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