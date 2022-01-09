const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017/";
const dbname = "sample_db";
MongoClient.connect(url,(error,client) => {
    if (!error){
        console.log("Connected");
    }
    else{
        console.log("Not Connected");
    }
})

// mongo.connect(url,(error,client) => {
//     if (!error){
//         console.log("Connected");
//     }
//     else{
//         console.log("Not Connected");
//     }
// })