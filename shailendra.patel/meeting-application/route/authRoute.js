var express = require('express');
var router = express.Router();
const { signup } = require("../controller/authController");


const { check } = require('express-validator');

router.post("/signup", [
    check("fullName", "name should be atleast 3 characters").isLength({min: 3}),
    check("emailId", "Valud email is required").isEmail(),
    check("password", "Password should not be empty, minimum eight characters, at least one letter, one number and one special character").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
],  signup);

module.exports = router;
