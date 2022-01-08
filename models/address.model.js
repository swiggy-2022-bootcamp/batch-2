const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

var addressSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    house_no: {
        type: Number,
        required: 'House No. can\'t be empty!'
    },
    street: {
        type: String,
        required: 'Street can\'t be empty!'
    },
    city: {
        type: String
    },
    state: {
        type: String,
        required: 'State can\'t be empty!'
    },
    zip: {
        type: Number,
        required: 'Zip code can\'t be empty!'
    }
});

autoIncrement.initialize(mongoose.connection);
addressSchema.plugin(autoIncrement.plugin, {
    model: "addresses", // collection or table name in which you want to apply auto increment
    field: "id", // field of model which you want to auto increment
    startAt: 1, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('Address', addressSchema);