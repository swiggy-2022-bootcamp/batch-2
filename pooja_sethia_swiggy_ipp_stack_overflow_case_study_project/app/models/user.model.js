module.exports = mongoose =>{
    var schema = mongoose.Schema(
        {
            registration_name:String,
            username:String,
            password:String,
            reputation:Number,
        }
    )
    schema.method("toJSON",function(){
        const {__v, _id,...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const User = mongoose.model("user",schema);
    return User;
};