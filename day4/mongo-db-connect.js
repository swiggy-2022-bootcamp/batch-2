const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017/';
const db_name = "sample_db_new";

MongoClient.connect(url,(err,client)=>{
    if(!err){
        console.log("connected!")
    }else{
        console.log("Not connected...Error in connecting")
    }
})

/*
const {MongoClient} = require("mongodb");
const url = 'mongodb://localhost:27017/';
const db_name = "sampledb";
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (!err) {
        console.log("connected succesfully");
    } else {
        console.log("Could not connnect");
    }
});

*/