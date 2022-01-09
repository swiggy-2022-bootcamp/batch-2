const express = require("express");
const app = express();
app.get("/users/all",(req,res) => {
    res.send("Users will be listed here");
})
app.post("/users/create",(req,res) =>{
    res.send("User will be created");
})
const server = app.listen(8080,() => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Running on %s %s",host,port);
})