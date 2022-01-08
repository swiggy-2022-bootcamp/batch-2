console.log('welcome to JS');

const {MongoClient} = require("mongodb");

const url = 'mongodb://localhost:27017/';

const db_name = 'sample_db';
 
MongoClient.connect(url, (err,client) => {
    if(!err){
        console.log("Connected !!");
    }else{
        console.log("Not connected  !!");
    }
})   