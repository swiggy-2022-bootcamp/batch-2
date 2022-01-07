module.exports = app => {
    const userController = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/signup",userController.create);
    router.get("/get_all_userController",userController.findAll);
    router.get("/get_user_by_id/:id",userController.findUserById);
    router.put("/update_user_by_id/:id",userController.updateUserById);
    router.delete("/delete_user_by_id/:id",userController.deleteUserById);1

    app.use("/user",router)
}