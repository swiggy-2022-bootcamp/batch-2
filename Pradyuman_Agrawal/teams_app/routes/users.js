module.exports = app => {
    const users = require("../controllers/users.js");
    var router = require("express").Router();

    router.post("/",users.create);
    router.get("/",users.getAllUser);
    router.get("/:id",users.findUserById);
    router.put("/:id",users.updateUserById);
    router.delete("/:id",users.deleteUserById);

    app.use("/users",router)
}