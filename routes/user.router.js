const express = require('express');
const router = express.Router();
const usr = require('../controllers/user.controller');
const jwtHelper = require('../util/jwtHelper');

/* Route to register a new user. */
router.post('/register', usr.validateUser, usr.registeruser);

/* Route to authenticate an user and generate token. */
router.post('/authenticate', usr.authenticateuser);

/* Route to fetch an user profile. */
router.get('/usrProfile', jwtHelper.verifyJwtToken, usr.usrProfile);

/* Route to fetch all Users. */
router.get('/users/', usr.getUsers);

/* Route to fetch an User by User ID. */
router.get('/users/:id', usr.getUser);

/* Route to update details of an User. */
router.put('/users', jwtHelper.verifyJwtToken, usr.updateUser);

/* Route to delete an user by User ID. */
router.delete('/users/:id', jwtHelper.verifyJwtToken, usr.deleteUser);

module.exports = router;