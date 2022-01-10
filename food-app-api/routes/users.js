const express = require('express')
const router = express.Router();
const User = require('../models/userModel');

router.post('/api/register', async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.json({
            message: `We ran into some issues while registering the new user you requested. Sorry for the inconvenience.`
        });
    }
});

router.post('/api/authenticate', async(req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.find({
            "username": req.body.username,
            "password": req.body.password
        });
        if (user.length == 0) {
            res.status(403).send("Unable to login. Please try again.");
        } else {
            res.status(200).send("User logged in successfully");
        }
    } catch (error) {
        res.json({
            message: `We ran into some issues while authenticating this user. Sorry for the inconvenience.`
        });
    }
});

router.get('/api/users', async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.json({
            message: `We ran into some issues while fetching the records of the user you requested. Sorry for the inconvenience.`
        });
    }
});

router.get('/api/users/:userId', async(req, res) => {
    const ID = req.params.userId
    try {
        const user = await User.find({ "userID": ID });
        if (user.length != 0) {
            res.json(user); //status(200).send(user);
        } else {
            res.status(404).send(`Sorry user with ID: ${ID} not found`);
        }
    } catch (error) {
        res.send({
            message: `We ran into some issues while fetching the records of the user you requested. Sorry for the inconvenience.`
        });
    }
});

router.put('/api/users/:userId', async(req, res) => {
    try {
        const updatedUser = await User.updateOne({ "userID": req.params.userId }, {
            $set: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                address: {
                    houseno: req.body.address.houseno,
                    street: req.body.address.street,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    zip: req.body.address.zip,
                }
            }
        });
        res.json(updatedUser);
    } catch (error) {
        res.json({
            message: `We ran into some issues while updating the records of the user you requested. Sorry for the inconvenience.`
        });
    }
});

router.delete('/api/users/:userId', async(req, res) => {
    const ID = req.params.userId
    try {
        const user = await User.find({ "userID": ID });
        const deleteUser = await User.deleteOne({ "userID": ID });
        if (user) {
            res.status(200).send({
                deleteUser,
                Message: 'User deleted successfully'
            })
        } else {
            res.send(`Sorry user with ID: ${ID} not found`);
        }
    } catch (error) {
        res.send({
            message: `We ran into some issues while deleting the records of the user you requested. Sorry for the inconvenience.`
        })
    }
});

module.exports = router;