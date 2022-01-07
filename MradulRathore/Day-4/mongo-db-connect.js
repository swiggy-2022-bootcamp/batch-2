const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/';

const db_name = "sample_db_mradul";

MongoClient.connect(url, (err, client) => {
    if (!err) {
        console.log("connected");
    }
    else {
        console.log("error connecting")
    }
})

