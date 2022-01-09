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

