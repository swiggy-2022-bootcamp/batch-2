const express = require('express');
const authenticateController = require('../controller/authenticate.controller');


const router = express.Router();


router.post('/', [authenticateController.validateInputs], authenticateController.authenticateUser)



module.exports = router;

