const express = require('express');
const authenticateController = require('../controller/authenticate.controller');

const router = express.Router();


// authenticate a user
router.post('/', [authenticateController.validateInputs], authenticateController.authenticateUser)


module.exports = router;

