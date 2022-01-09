var express = require('express')

var app = express();

app.get("/users/get_all_users", function(req,res){
    res.send("all users list will be shown.")
})

app.post("/users/signup", function(req,res){
    res.send("New User Created");
})

app.put("/users/update_user_by_id", function(req,res){
    res.send("Updatng user soon ...")
})

app.delete("/user/delete_user_by_id", function(req,res){
    res.send("Deleting user ...")
})

var server = app.listen(8080,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("app is listening at http://%s:%s ", host, port);
})