const mongoose = require('mongoose');

// url for mongodb server
const url = 'mongodb://127.0.0.1:27017/stack-overflow';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});