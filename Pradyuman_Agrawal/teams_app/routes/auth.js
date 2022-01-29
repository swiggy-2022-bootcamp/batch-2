const authRouter = require('express').Router();
const auth = require("../controllers/auth.js");

authRouter.post("/login",auth.login);
authRouter.get("/logout",auth.logout);

module.exports = authRouter