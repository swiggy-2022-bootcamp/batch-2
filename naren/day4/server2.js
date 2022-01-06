var express = require('express');

var app = express();

// middleware express has access to the res and req objects
// the function inside i a request is callback function
// defined an end point of type GET
app.get("/users/getallusers",(req,res) => 
{
    res.send("all users will be listed soon");
});


app.post("/users/signup",(req,res) =>
{
    res.send("new user created");
});

app.put("/users/updateuserbyId",(req,res) =>
{
    res.send("updating user soon");
});

app.delete("/users/deleteuserbyId",(req,res) =>
{
    res.send("deleting user soon");
});


var server = app.listen(8080,function()
{
    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening on http://%s:%s ",host,port);
});