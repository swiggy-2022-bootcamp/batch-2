module.exports = mongoose => {
    var addressSchema = mongoose.Schema({
        houseno: {
            type: Number
        },
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },

        zip: {
            type: Number
        },
    }
    )
    var userSchema = mongoose.Schema(
        {
            username: {
                type: String,
                default: null
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            address: [addressSchema],
            token: {
                type: String
            },

        }
    )

    // userSchema.method("toJSON", function () {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    const User = mongoose.model("user", userSchema);
    return User;
};