const auth = require("../middleware/auth");


module.exports = app => {
    const users = require("../controllers/user.js");
    var router = require("express").Router();

    router.post("/signup", users.createUser);
    router.post("/login", users.signIn);

    app.use("/users", router)
}

