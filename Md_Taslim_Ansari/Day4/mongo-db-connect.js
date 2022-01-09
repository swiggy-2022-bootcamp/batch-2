const {MongoClient}=require('mongodb');
const url='mongodb://127.0.0.1:27017';
const db_name='sampledb';
MongoClient.connect(url,(err,client)=>
{
    if(!err)
    {
        console.log("connected...!!!");
    }
    else
    {
        console.log("Not Connected");
    }
})