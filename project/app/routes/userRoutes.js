module.exports = app =>{
    const users = require("../controller/user.controller.js");
    var router = require("express").Router();

    router.post("/register",users.create);
    router.get("/users",users.findAllUsers);
    router.get("/users/:id",users.findUserById);
    router.put("/users",users.updateUserById)
    router.delete("/users/:id",users.deleteUserById)
    router.post("/authenticate",users.authenticate)

    app.use("/api",router);
}