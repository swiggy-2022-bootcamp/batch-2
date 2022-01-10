var http = require('http')
var server = http.createServer(function(req,res){
    console.log("request received")
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write('<html><body><h1> Hi welcome to NodeJS!</h1></body></html>')
    res.end();
})
server.listen(8081);