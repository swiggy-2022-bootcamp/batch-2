const express = require('express');
const users = require('../controllers/user');
const auth = require('../middleware/auth'); // middleware

const router = new express.Router();

router.post('/users', users.createUser);

router.post('/users/login', users.loginUser);

// passing middleware 'auth' as argument

router.post('/users/logout', auth, users.logOut);

router.post('/users/logoutall', auth, users.logOutAll);

router.get('/users/me', auth, users.findAllUsers);

router.get('/user_by_id/:id', users.findUserById);

module.exports = router;