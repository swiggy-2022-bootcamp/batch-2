
const { rmSync } = require('fs');
var http = require('http')
var server = http.createServer(function(req,res){
    
    res.writeHead(200, {'Content-Type':'text/html'})
    res.write('<html><body><h1>Welcome to NODEJS!</h1></body></html>')
    res.end();
    console.log('request received');
})


 server.listen(8001);