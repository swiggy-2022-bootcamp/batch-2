// note here desctruturing
// third party module mongodb
const {mongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017/';
const db_name = "sample_db1";

mongoClient.connect(url,(err,client) =>
{ if (err)
    {
        console.log("error");
    }
    else
    {
        console.log("noerror CONNECTED");
    }

});