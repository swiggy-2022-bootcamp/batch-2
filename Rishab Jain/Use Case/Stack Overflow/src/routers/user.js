const express = require('express');
const users = require('../controllers/user');

const router = new express.Router();

router.post('/users', users.createUser);

router.get('/users', users.findAllUsers);

router.get('/user_by_id/:id', users.findUserById);

module.exports = router;