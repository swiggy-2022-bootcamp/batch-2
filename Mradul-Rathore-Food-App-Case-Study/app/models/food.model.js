module.exports = mongoose => {

    var foodSchema = mongoose.Schema(
        {
            foodId: {
                type: Number,
                unique: true
            },
            foodName: {
                type: String
            },
            foodCost: {
                type: Number
            },
            //Indian, Chinese, Mexican
            foodType: {
                type: String,
                enum: ['Indian', 'Chinese', 'Mexican'],

            }

        }
    )

    foodSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const food = mongoose.model("food", foodSchema);
    return food;
};