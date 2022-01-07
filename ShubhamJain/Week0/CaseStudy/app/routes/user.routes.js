var logger = require('../config/winston');

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    logger.info("inside user routes");
    router.post("/api/register",users.createUser);
    router.get("/get_all_users",users.findAllUsers);
    router.get("/get_user_by_id/:id",users.fundUserById);
    router.put("/update_user_by_id/:id",users.updateUserById);
    router.delete("/delete_user_by_id/:id",users.deleteUserById);

    app.use("/users",router)
}