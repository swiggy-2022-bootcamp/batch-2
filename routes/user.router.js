const express = require('express');
const router = express.Router();
const usr = require('../controllers/user.controller');
const jwtHelper = require('../util/jwtHelper');

router.post('/register', usr.registeruser);
router.post('/authenticate', usr.authenticateuser);
router.get('/usrProfile', jwtHelper.verifyJwtToken, usr.usrProfile);
router.get('/users/', usr.getUsers);
router.get('/users/:id', usr.getUser);
router.delete('/users/:id', jwtHelper.verifyJwtToken, usr.deleteUser);

module.exports = router;