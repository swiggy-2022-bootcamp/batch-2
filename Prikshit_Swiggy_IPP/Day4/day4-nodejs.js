/**
 * JS - NodeJS
 */

 var express = require("express");

 var app = express(); 

 app.get("/users/get_all_users", (req, res) => {
    res.send("All Users list will be listed soon....");
 })

 app.post("/users/signup", function(req, res) {
    res.send("New user will be created soon....");
 })

 app.post("/users/signin", function(req, res) {
    res.send("validating user soon....");
 })

 app.put("/users/update_user_by_id", function(req, res) {
    res.send("updating user soon....");
 })

 app.delete("/users/delete_user_by_id", function(req, res) {
    res.send("deleting user soon....");
 })

 var server = app.listen(3000,'0.0.0.0', function(){
     var host = server.address().address;
     var port = server.address().port;
     console.log("Server running at http://%s:%s ", host, port);
 });


























