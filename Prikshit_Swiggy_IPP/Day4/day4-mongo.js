/**
 * JS- MonoDB Connection
 */


const {MongoClient} = require("mongodb");
const url = 'mongodb://localhost:27017/';
const db_name = "demoDb";

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (!err) {
        console.log("connected succesfully");
    } else {
        console.log("Could not connnect");
    }
});