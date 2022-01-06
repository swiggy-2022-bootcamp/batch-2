var mysql = require('mysql');

// connecting module to external package

var connect1 = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"something"
    }
);

connect1.connect(function(err)
{
    if(err) throw err;
    console.log("connected");
});