module.exports = app => {
    const food = require("../controllers/food.controller.js");
    const auth = require("../middleware/auth.js");
    var router = require("express").Router();

    router.post("/food", food.addFood);
    router.get("/food/:foodid", auth, food.fetchFoodByID);

    app.use("/api", router)
}