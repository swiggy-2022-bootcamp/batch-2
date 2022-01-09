const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

/**
 * Food model definition
 */
var foodSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    food_id: {
        type: Number,
        unique: true
    },
    food_name: {
        type: String,
        required: 'Food name can\'t be empty!'
    },
    food_cost: {
        type: Number,
        required: 'Food cost can\'t be empty!'
    },
    food_type: {
        type: String
    }
});

autoIncrement.initialize(mongoose.connection);
foodSchema.plugin(autoIncrement.plugin, {
    model: "foods", // collection or table name in which you want to apply auto increment
    field: "id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('Food', foodSchema);