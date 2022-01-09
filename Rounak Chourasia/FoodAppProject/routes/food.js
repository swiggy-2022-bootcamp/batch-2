const express = require("express")
const auth = require("../middleware/auth");
const Food = require('../models/food');

const router = express.Router();

// all routes with /api/food

// Getting all Food
router.get('/', auth, async (req, res) => {

    try {
        const foods = await Food.find();
        res.status(201).send(foods);
    } catch (e) {
        res.status(409).send({ success: false, msg: e.message });
    }
});

// Create Food
router.post('/', async (req, res) => {

    const { foodName, foodId, foodCost, foodType } = req.body;

    // Validations
    const foodExists = await Food.exists({ foodId: foodId });
    if (foodExists) {
        return res.status(409).send({ success: false, msg: 'Food with same FoodId already exists' });
    }

    if (!(foodType == "Indian" || foodType == "Chinese" || foodType == "Mexican")) {
        return res.status(400).send({ success: false, msg: 'Food Type can only be Indian, Mexican or Chinese' });
    }

    const food = new Food({
        foodName: foodName,
        foodId: foodId,
        foodCost: foodCost,
        foodType: foodType
    });

    try {
        await food.save()
        res.status(200).send(food);
    } catch (e) {
        console.error(e.message);
    }

});

// Get food By Id
router.get('/:foodID', auth, async (req, res) => {
    try {
        const food = await Food.findOne({ foodId: req.params.foodID });
        if (food) {
            res.status(201).send(food);
        } else {
            res.status(404).send({ success: false, msg: `Sorry Food Not Found` });
        }

    } catch (e) {
        console.log(e)
    }
});


module.exports = router;