const http = require('http');

http.createServer((req, res)=>{
    res.write("HELLO!");
    res.end();
}).listen(8765);
