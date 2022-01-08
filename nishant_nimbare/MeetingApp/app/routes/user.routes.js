const userRouter = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

userRouter.post("/login", userController.login, authController.sendToken);
userRouter.post("/signup", userController.register, authController.sendToken);


module.exports = userRouter;