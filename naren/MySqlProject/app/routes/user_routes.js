module.exports = app => {
    const users = require("../controllers/user_controller.js");
    var router = require("express").Router();

    router.post("/registerUser",users.createUser);
    router.get("/listAllUsers",users.listAllUsers)
    router.post("/login",users.loginUser)
    

    app.use("/users",router)
}