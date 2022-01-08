var express = require("express")

var app = express();

app.get("/users/get_all_users",(req, res) => {
    res.send("all users list will be listed soon..");
})

app.post("/users/signup",(req, res) => {
    res.send("new user signup soon..");
})

app.post("/users/signin",(req, res) => {
    res.send("user signin soon..");
})

app.put("/user/update_user_by_id",(req, res) => {
    res.send("updating user by id soon..");
})

app.delete("/user/delete_user_by_id",(req, res) => {
    res.send("new user signup soon..");
})

var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address.port;
    console.log("app listening at http://%s:%s",host,port);
} )