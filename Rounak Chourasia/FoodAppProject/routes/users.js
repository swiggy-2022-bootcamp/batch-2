const express = require("express")
const auth = require("../middleware/auth");
const { findByIdAndUpdate } = require("../models/user");
const User = require('../models/user');

// const id = uuidv4();

const router = express.Router();

// all routes with /api/users

// Getting all users
router.get('/', auth, async (req, res) => {

    try {
        const users = await User.find();
        res.status(201).send(users);
    } catch (e) {
        res.status(409).send({ success: false, msg: e });
    }

});

// Updating users
router.put('/', auth, async (req, res) => {

    const { _id } = req.body;
    const newUser = req.body;

    try {
        User.findByIdAndUpdate(_id, newUser, (err, updatedUser) => {
            if (!err) {
                return res.status(200).send(user);
            } else {
                return res.status(404).send({ success: false, msg: `Sorry user With ${req.params.id} not found` });
            }
        });
    } catch (e) {
        res.status(400).send({ success: false, msg: e.message });
    }

});

// get user by id
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(201).send(user);
        } else {
            res.status(404).send({ success: false, msg: `Sorry user With ${req.params.id} not found` });
        }

    } catch (e) {
        console.log(e)
    }
});

// Delete user by id
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.remove(user);
            res.status(200).send({ success: true, msg: "User Deleted Sucessfully" });
        } else {
            res.status(404).send({ success: false, msg: `Sorry user With ${req.params.id} not found` });
        }

    } catch (e) {
        console.log(e)
    }
});

module.exports = router;