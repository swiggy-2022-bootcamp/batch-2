var express = require('express');

var app = express();

app.get("/users/get_all_user/", function(req, res){
    res.send("all users list");
});

app.post("/users/signup/", function(req, res){
    res.send("new user created");
});

app.post("/users/signin/", function(req, res){
    console.log(req.body)
    res.send("user signed in");
});

app.put("/users/update_user_by_id/", function(req, res){
    res.send("user updated");
});

app.delete("/users/delete_user_by_id/", function(req, res){
    res.send("user deleted");
});

var server = app.listen(8080, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening to port:" + port + " and host: " + host);
});