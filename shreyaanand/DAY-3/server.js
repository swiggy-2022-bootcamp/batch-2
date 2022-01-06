var http = require('http');
var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write('<html><body><h1>Welcome to NodeJS!!</h1><body></html>')
    res.end();
    console.log("Request Recieved.")
})

server.listen(8081)