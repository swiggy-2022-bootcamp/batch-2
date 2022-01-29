const userRouter = require('express').Router();
const users = require("../controllers/users.js");

userRouter.post("/",users.create);
userRouter.get("/",users.getAllUser);
userRouter.get("/:id",users.findUserById);
userRouter.put("/:id",users.updateUserById);
userRouter.delete("/:id",users.deleteUserById);

module.exports = userRouter;