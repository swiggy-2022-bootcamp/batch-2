const { createFood, getFoods, getFoodById } = require("./foods.controller");
const router = require("express").Router();

router.post("/", createFood);
router.get("/", getFoods);
router.get("/:id", getFoodById);

module.exports = router; 