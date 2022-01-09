const db = require("../config/db.config")
const Food = db.foods;

//register user
exports.addFood = async (req, res) => {

    try {
        // Get user input
        const { foodName, foodCost, foodType } = req.body;

        // Validate food type
        if (foodType != "Indian" && foodType != "Mexican" && foodType != "Chinese") {
            res.status(400).send("Food type is not valid. Valide types: Indian/Mexican/Chinese");
        }

        // Create food in our database
        const food = await Food.create({
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
exports.fetchFoodById = (req, res) => {
    const id = req.params.id;
    console.log(id)
    Food.findById(id).then(
        data => {
            if (!data)
                res.status(404).send({ message: "Sorry Food Not Found" })
            else
                res.send(data);
        }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "error while retrieving the user with id " + id
        })
    })
}
