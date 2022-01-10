const express = require('express')
const router = express.Router();
const Food = require('../models/foodModel');

router.post('/api/food/', async(req, res) => {
    const food = new Food({
        foodId: req.body.foodId,
        foodName: req.body.foodName,
        foodCost: req.body.foodCost,
        foodType: req.body.foodType
    });
    try {
        const addFood = await food.save();
        res.status(201).send(addFood);
    } catch (error) {
        res.send({ message: `We ran into some issues while adding new records of the food. Sorry for the inconvenience.` });
    }
});

router.get('/api/food/', async(req, res) => {
    try {
        const foods = await Food.find();
        res.send(foods);
    } catch (error) {
        res.send({ message: `We ran into some issues while fetching the records of the food you requested. Sorry for the inconvenience.` });
    }
});

router.get('/api/food/:foodId', async(req, res) => {
    try {
        const food = await Food.find({ "foodId": req.params.foodId });
        if (food.length == 0) {
            res.send("Sorry Food Not Found");
        } else {
            res.send(food);
        }
    } catch (error) {
        res.send({ message: `We ran into some issues while fetching the records of the food you requested. Sorry for the inconvenience.` });
    }
});

module.exports = router;