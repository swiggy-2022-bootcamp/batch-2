var router = require("express").Router();
const users = require("../controllers/user.controller.js");

router.post("/register", users.registerUser);
router.post("/authenticate", users.authenticate);

module.exports = router;