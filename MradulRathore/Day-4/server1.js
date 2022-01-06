var express = require('express')

var app = express();

app.get("/users/get-all-users", function (req, res) {
    res.send('all user list will be listed soon')
})

app.get("/users/signup", function (req, res) {
    res.send('new user created')
})
app.get("/users/signin", function (req, res) {
    res.send('validating user soon')
})
app.put("/user/update-user-by-id", function (req, res) {
    res.send('updating user...')
})
app.delete("/user/delete_id", function (req, res) {
    res.send('deleting user soon...')
})


var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host + " " + port)
})