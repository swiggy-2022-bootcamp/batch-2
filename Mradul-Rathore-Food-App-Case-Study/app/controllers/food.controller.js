const db = require("../models")
const Food = db.foods;

//register user
exports.addFood = async (req, res) => {

    try {
        // Get user input
        const { foodName, foodCost, foodType } = req.body;

        // Create food in our database
        const food = await Food.create({
            foodName: foodName,
            foodCost: foodCost,
            foodTYpe: foodType,
        });

        // return new food
        res.status(201).json(food);
    } catch (err) {
        console.log(err);
    }
};