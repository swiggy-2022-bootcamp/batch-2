const express = require('express');
const users = require('../controllers/user');
const auth = require('../middleware/auth'); // middleware

const router = new express.Router();

router.post('/users', users.createUser);

router.post('/users/login', users.loginUser);

// passing middleware 'auth' as argument

router.post('/users/logout', auth, users.logOut);

// log out user from all devices
router.post('/users/logoutall', auth, users.logOutAll);

router.get('/users/me', auth, users.getUserDetails);

router.get('/user_by_id/:id', auth, users.findUserById);

router.get('/users_all/', auth, users.findAllUsers);


module.exports = router;