const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//signup user
exports.createUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        console.log(req.body)
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        //Encrypting user password
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "4h",
            }
        );
        user.token = token;
        data = { "message": "user registered successfully", "details": user };
        res.status(200).json(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "error while creating the User."

        })
    }
}


exports.signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exists in our database
        const user = await User.findOne({ email });
        console.log(user);
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            console.log(user);
            data = { "message": "user login successfully", "details": user };
            res.status(200).json(data);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}

exports.listUsers = async (req, res, next) => {
    try {
        const { sortType = '-created' } = req.body;
        const users = await User.find().sort(sortType);
        res.json(users);
    } catch (error) {
        next(error);
    }
};