var http=require('http')
var server=http.createServer(function(req,res)
{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<html><body><h1>Hi...Welcome to Node.js...!!!</h1></body></html>')
        res.end();
        console.log("Request Received")
})
server.listen(8081);
