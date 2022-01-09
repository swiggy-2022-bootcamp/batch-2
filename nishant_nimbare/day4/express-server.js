var express = require('express');

var app = express();

app.get("/users/getallusers",(req,res) => {
    res.send("all users ");
});


app.post("/users/signup",(req,res) =>{
    res.send("new user created");
});

app.put("/users/updateuserbyId",(req,res) =>{
    res.send("updating user..");
});

app.delete("/users/deleteuserbyId",(req,res) =>{
    res.send("deleting user..");
});


var server = app.listen(8765,() => {
    console.log("app listening on http://%s:%s ",server.address().address ,server.address().port);
});