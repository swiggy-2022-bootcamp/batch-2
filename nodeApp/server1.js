var express = require('express')
const service = require('./service')
var app = express();

app.get('/users', (req, res) => {
    res.send('Returns all users');
    // res.writeHead(403,  {'Content-Type':'text/html'});
    // res.end();
})

app.get('/user/:id', (req, res) => {
    res.send('return users by id');
})

app.post('/user',(req, res) => {
    res.send('add new user/signup')
})

app.post('/login', (req, res) => {
    res.send('login existing user');
})

app.put('/user/:id', (req, res) => {
    res.send('updates user by id')
})

app.delete('/user/:id', (req, res) => {
    res.send('delete user by id')
})

var server = app.listen(8888, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`app listening at http://${host}:${port}`);
})