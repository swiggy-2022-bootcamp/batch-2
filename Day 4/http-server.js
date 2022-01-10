var http = require('http');
var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content':'text/html'});
    res.write('<h1>Welcome to Node JS</h1>');
    res.end();
    console.log('Server Running...')
});

server.listen(8081);