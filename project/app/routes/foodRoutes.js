module.exports = app =>{
    const foods = require("../controller/food.controller.js");
    var router = require("express").Router();

    router.post("/food",foods.create);
    router.get("/food/:id",foods.getFoodById);
    router.get("/food",foods.getAllFood);
    router.delete("/food/:id",foods.deleteFoodById);
    router.get("/food/cuisines/:cuisine",foods.findByCuisine);

    app.use("/api",router);
}