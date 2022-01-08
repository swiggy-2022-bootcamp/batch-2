const express = require('express');
const registerController = require('../controller/register.controller');

const router = express.Router();

// register new user
router.post('/', [registerController.validateInputs, registerController.checkIfUserExists, registerController.generatePasswordHash], registerController.registerUser);


module.exports = router;
