const express = require('express');
const users = require('../controllers/user');
const auth = require('../middleware/auth'); // middleware

const router = new express.Router();

// Sign up User
router.post('/users/signup', users.createUser);

// Log in User
router.post('/users/login', users.loginUser);

// passing middleware 'auth' as argument

// Log out User
router.post('/users/logout', auth, users.logOut);

// Log out user from all devices
router.post('/users/logoutall', auth, users.logOutAll);

// Get logged in user details
router.get('/users/me', auth, users.getUserDetails);

// Get any user by id
router.get('/user_by_id/:id', auth, users.findUserById);

// Get all users
router.get('/users_all/', auth, users.findAllUsers);


module.exports = router;