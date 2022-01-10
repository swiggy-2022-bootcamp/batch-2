const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    foodId: {
        type: Number,
        required: true,
        unique: true
    },
    foodName: {
        type: String,
        required: true,
        unique: true
    },
    foodCost: {
        type: Number,
        required: true
    },
    foodType: {
        type: String,
        default: 'Indian'
    }
}, { versionKey: false });

module.exports = mongoose.model('food', FoodSchema);