module.exports = mongoose =>{
    var schema = mongoose.Schema(
        {
            question_title:String,
            question_body:String,
            answers:[],
            asking_member:String,
            vote_count:Number,
        }
    )
    schema.method("toJSON",function(){
        const {__v, _id,...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Question = mongoose.model("question",schema);
    return Question;
};

