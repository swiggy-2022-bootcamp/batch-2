module.exports = mongoose =>{
    var schema = mongoose.Schema(
        {
            answer_text:String,
            username:{
                type: mongoose.SchemaTypes.ObjectId,
                ref:"user"
            },
            vote_count:Number,
        }
    )
    schema.method("toJSON",function(){
        const {__v, _id,...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Answer = mongoose.model("answer",schema);
    return Answer;
};