const express = require("express")
// import fs from "fs";
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const router = express.Router();

// const userDataPath = './mock_data/users.json' // path to our JSON file

// // util functions
// const saveAllAccountData = (data) => {
//     const stringifyData = JSON.stringify(data)
//     fs.writeFileSync(userDataPath, stringifyData)
// }

// const getAllAccountData = () => {
//     const jsonData = fs.readFileSync(userDataPath)
//     return JSON.parse(jsonData)
// }

// const accountExists = (reqAcc, existingAccounts) => {
//     for (const acc in existingAccounts) {
//         if (acc == reqAcc.id || existingAccounts[acc].username == reqAcc.username) return false;
//     }
// }


// all routes with /api

router.post('/register', async (req, res) => {

    // Validations
    const emailExists = await User.exists({ email: req.body.email });
    // console.log(isEmailUnique);
    if (emailExists) {
        return res.status(409).send({ success: false, msg: 'Account with same email id already exists' });
    }

    const usernameExists = await User.exists({ username: req.body.username });
    if (usernameExists) {
        return res.status(409).send({ success: false, msg: 'Username is already taken' });
    }


    const reqAddress = {
        houseno: req.body.address.houseno,
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip,
    };

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        address: reqAddress
    });

    try {
        await user.save()

        // Create JWT
        const token = jwt.sign({ user_id: user._id, email: user.email }, process.env.TOKEN_KEY);
        // save user token
        user.token = token;
        res.status(201).send(user);
    } catch (e) {
        console.error(e.message);
    }

    // if (!accExists) {
    //     existingAccounts[req.body.id] = req.body;
    //     saveAccountData(existingAccounts);
    //     res.status(201).send(req.body);
    // } else {
    //     res.status(409).send({ success: false, msg: 'account id or username already exists' });
    // }
});

router.post('/authenticate', async (req, res) => {

    try {
        // Get user input
        const { username, password } = req.body;

        // Validate input
        if (!(username && password)) {
            res.status(400).send("Username and Password Required For Authentication");
        }
        // Validate if user exist
        const user = await User.findOne({ username, password });

        if (user) {
            // Create token
            const token = jwt.sign({ user_id: user._id, email: user.email }, process.env.TOKEN_KEY);
            // save user token

            const resp = {
                message: "User logged in successful",
                token: token
            }

            //   user.token = token;

            // user
            res.status(200).send(resp);
        } else {
            res.status(403).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }

});


module.exports = router;












// router.post('/register', (req, res) => {
//     let existingAccounts = getAllAccountData()

//     // Since id and Username is given in payload, making sure any user with same id or username does not exist
//     // user id could be assigned by us but that will be against user story

//     accExists = accountExists(req.body, existingAccounts);

//     if (!accExists) {
//         existingAccounts[req.body.id] = req.body;
//         saveAccountData(existingAccounts);
//         res.status(201).send(req.body);
//     } else {
//         res.status(409).send({ success: false, msg: 'account id or username already exists' });
//     }
// });



//     let existingAccounts = getAllAccountData()

//     let isAuthenticated = false;
//     for (const acc in existingAccounts) {
//         if (existingAccounts[acc].username == req.body.username && existingAccounts[acc].password == req.body.password) {
//             isAuthenticated = true;
//         }
//     }

//     if (isAuthenticated) {
//         res.status(200).send({ message: "User logged in successful" });
//     } else {
//         res.status(403).send({ error: "Invalid User" });
//     }


// export default router;