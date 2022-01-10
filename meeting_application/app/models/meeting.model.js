module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            start_date: { type: Date },
            start_time: { type: String},
            end_time: { type: String },
            description: {type: String},
            invitee: {type: String},
            members: {type: Array , "default" : [], "uniqueItems": true}
        }
    ) 
   
    schema.method("toJSON",function(){
        const { __v,_id,...object} = this.toObject();
        object.id = _id;
        return object;
    });
   
    const Meeting = mongoose.model("meeting",schema);
    return Meeting;
   };