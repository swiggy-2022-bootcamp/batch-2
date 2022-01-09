const db = require("../config/db.config")
const Food = db.foods;

//register user
exports.addFood = async (req, res) => {

    try {
        // Get user input
        const { foodId, foodName, foodCost, foodType } = req.body;

        // Validate food type
        if (foodType != "Indian" && foodType != "Mexican" && foodType != "Chinese") {
            res.status(400).send("Food type is not valid. Valide types: Indian/Mexican/Chinese");
        }

        // check if food already exist
        // Validate if food exist in our database
        const oldFood = await Food.findOne({ foodId });

        if (oldFood) {
            return res.status(409).send("Food Already Exist.");
        }

        // Create food in our database
        const food = await Food.create({
            foodId: foodId,
            foodName: foodName,
            foodCost: foodCost,
            foodType: foodType,
        });

        // return new food
        res.status(201).json(food);
    } catch (err) {
        console.log(err);
    }
};

//fetch food by id
exports.fetchFoodById = async (req, res) => {
    const foodId = req.params.id;

    const food = await Food.findOne({ foodId });

    if (!food)
        res.status(404).send({ message: "Sorry Food Not Found" })
    else
        res.send(food);
}


