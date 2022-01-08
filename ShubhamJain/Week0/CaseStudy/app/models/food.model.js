
module.exports = mongoose => {

    var schema = mongoose.Schema({
        foodId: Number,
        foodName: String,
        foodCost: Number,
        foodType: {
            type: String,
            enum: ['Indian', 'Chinese', 'Mexican']
        }
    })

    const Food = mongoose.model("food", schema);
    return Food;
}