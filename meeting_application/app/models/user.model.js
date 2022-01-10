module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            first_name: { type: String },
            last_name: { type: String },
            email: { type: String},
            password: { type: String },
            meeting: {type: Array , "default" : [], "uniqueItems": true},
            team: {type: Array, "default" : [], "uniqueItems": true},
        }
    ) 
   
    schema.method("toJSON",function(){
        const { __v,_id,...object} = this.toObject();
        object.id = _id;
        return object;
    });
   
    const User = mongoose.model("user",schema);
    return User;
   };