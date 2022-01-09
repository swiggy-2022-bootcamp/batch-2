const http = require("http");
const server = http.createServer((req,res) => {
    console.log("Hello Welcome to node");
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<html><body>Hello Welcome to Node js</body></html>");
    res.end();
})

server.listen(8081);