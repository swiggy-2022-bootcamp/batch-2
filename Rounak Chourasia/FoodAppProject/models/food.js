const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({

    "foodName": {
        type: String,
        required: true
    },
    "foodId": {
        type: Number,
        required: true,
        unique: true
    },
    "foodCost": {
        type: Number,
        required: true
    },
    "foodType": {
        type: String
    }
}, { timestamps: true })


module.exports = mongoose.model('Food', foodSchema);


