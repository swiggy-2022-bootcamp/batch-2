module.exports = app => {

    const users = require("../controllers/user.controller.js");
    const food = require("../controllers/food.controller.js");
    const auth = require("../middleware/auth.js");
    var router = require("express").Router();

    router.post("/register", users.registerUser);
    router.post("/authenticate", users.authenticate);

    router.get("/users", auth, users.fetchAllUsers);
    router.get("/users/:id", auth, users.fetchUserById);
    router.put("/users", auth, users.updateUserById);
    router.delete("/users/:id", users.deleteUserById);

    router.post("/food", auth, food.addFood);
    router.get("/food/:id", auth, food.fetchFoodById);

    app.use("/api", router)
}