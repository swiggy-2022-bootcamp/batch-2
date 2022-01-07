var http = require('http')
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html'})
    res.write('<html><body><h1>Hello from server!</h1></body></html>')
    res.end();
    console.log('request received!');
})

server.listen(8081)