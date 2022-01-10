var express = require("express")

var app = express();

app.get("/users/get_all_users",(req,res)=>{
    res.send("all users list will be listed soon...");
})

var server = app.listen(8888,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening at http://%s:%s ",host,port);
});