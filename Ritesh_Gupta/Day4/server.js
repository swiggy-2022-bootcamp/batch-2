var http = require('http');
var server = http.createServer(function (req, res) {
    console.log("Request recieved, mradul");
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><h1>welcome</h1></body></html>');
    res.end();
    console.log("request recieved");
})

server.listen(8082); 