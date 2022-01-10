module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/register",users.register);
    router.post("/login",users.login);
    // router.put("/update_user_by_id/:id",users.updateUserById);
    // router.get("/get_user_by_id/:id",users.fundUserById);
    
    // router.delete("/delete_user_by_id/:id",users.deleteUserById);

    app.use("/users",router)
}