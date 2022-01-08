var express = require('express');
var router = express.Router();
const { signup, signin, authenticateToken } = require("../controller/authController");


const { check } = require('express-validator');

router.post("/register", [
    check("fullName", "name should be atleast 3 characters").isLength({min: 3}),
    check("emailId", "Valud email is required").isEmail(),
    check("password", "Password should not be empty, minimum eight characters, at least one letter, one number and one special character").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
],  signup);

router.post("/login", [
    check("emailId", "Email is required").isEmail(),
    check("password", "Password field is required").isLength({min:1})
], signin);

// router.get("/user", authenticateToken, (req, res) => {
//     res.json({
//         msg: "all good",
//         userId: req.userId
//     });
// })
module.exports = router;
