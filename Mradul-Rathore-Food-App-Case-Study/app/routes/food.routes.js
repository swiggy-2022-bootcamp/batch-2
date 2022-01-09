const food = require("../controllers/food.controller.js");
var router = require("express").Router();
const auth = require("../middleware/auth.js");

router.post("/", auth, food.addFood);
router.get("/:id", auth, food.fetchFoodById);

module.exports = router;