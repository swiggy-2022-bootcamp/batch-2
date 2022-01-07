const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017/';
const db_name = 'sampleDb';
MongoClient.connect(url, (err,client) => {
    if(!err) {
        console.log('connected!');
    } else {
        console.log('not connected.... error in connectivity')
    }
})