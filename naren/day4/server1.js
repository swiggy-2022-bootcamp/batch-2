// ********** day 4 CLASS**********


// to include modules use require
// core module http
const http = require("http");

// lets create a http server
var server = http.createServer(function(req,res){
    //console.log("request recieved")
    //res.writeHead(200,{'Content-Type':'text/html'});
    //res.write('<html><body><welcomeToNode</body></html>');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World!');
    res.end();
    //console.log("request recieved");
});

server.listen(8081);

