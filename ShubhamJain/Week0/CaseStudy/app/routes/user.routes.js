var logger = require('../config/winston');
const helper = require('../../helper');

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    logger.info("inside user routes");
    router.post("/register",users.createUser);
    router.get("/users", helper.checkAuthenticated, users.findAllUsers);
    router.get("/users/:id",users.findUserById);
    router.put("/users",users.updateUserById);
    router.delete("/users/:id",users.deleteUserById);

    app.use("/api",router)
}