module.exports = app => {
    const users = require("../controllers/users.js");
    var router = require("express").Router();

    router.post("/signup",users.create);
    router.get("/:emailId",users.findUserByEmailId);
    router.put("/:emailId",users.updateUserByEmailId);
    router.delete("/:emailId",users.deleteUserByEmailId);

    app.use("/users",router)
}