module.exports = mongoose => {
    const schema = mongoose.Schema({
        email:String,
        password:String
    })

    // cannot use arrow functions bc it does not have 'this'
    schema.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("user", schema);
    return User;
}
