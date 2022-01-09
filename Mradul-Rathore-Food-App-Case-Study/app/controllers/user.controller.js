const db = require("../models")
const User = db.users;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//register user
exports.registerUser = async (req, res) => {

    try {
        // Get user input
        const { username, email, password, address } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            username: username,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            address: address
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
};

//authenticate user
exports.authenticate = async (req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            const sucessMessage = {
                message: "user logged in successful"
            }
            // user
            res.status(200).json(sucessMessage);
        }
        res.status(403).send("Forbidden");
    } catch (err) {
        console.log(err);
    }
}

//fetch all users
exports.fetchAllUsers = (req, res) => {
    User.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error while retrieving the users."
        })
    })
}

//fetch user by id
exports.fetchUserById = (req, res) => {
    const id = req.params.id;
    User.findById(id).then(
        data => {
            if (!data)
                res.status(404).send({ message: "Sorry user With " + id + " not found" });
            else
                res.send(data);
        }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "error while retrieving the user with id " + id
        })
    })
}

//update user by id
exports.updateUserById = (req, res) => {
    const id = req.body.id;

    User.findOneAndUpdate({ _id: id }, req.body).then(function (user) {
        User.findOne({ _id: id }).then(function (user) {
            if (!user)
                res.status(404).send({ message: "Sorry user with " + id + " not found" });
            else
                res.status(200).json(user);
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error updating the user with id " + id
        })
    })
}

