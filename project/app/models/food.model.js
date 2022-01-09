module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            foodId:Number,
            foodName:String,
            foodCost:Number,
            foodType: String, 
        }
    )

    schema.method("toJSON",function(){
        const {__v,_id,...object} = this.toObject();
        object.foodId = _id;
        return object;
    })
    const Food = mongoose.model("food",schema);
    return Food;
}