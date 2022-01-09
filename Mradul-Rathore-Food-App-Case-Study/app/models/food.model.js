module.exports = mongoose => {

    const foodType = {
        INDIAN: 'Indian',
        CHINESE: 'Chinese',
        MEXICAN: 'Mexican'
    }
    var foodSchema = mongoose.Schema(
        {
            foodName: {
                type: String
            },
            foodCost: {
                type: Number
            },
            //Indian / Chinese / Mexican
            foodType: {
                type: String,
                enum: ['Indian', 'Chinese', 'Mexican'],
            }

        }
    )

    // foodSchema.method("toJSON", function () {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    const food = mongoose.model("food", foodSchema);
    return food;
};