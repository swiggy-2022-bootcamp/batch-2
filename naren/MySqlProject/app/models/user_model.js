//const sql = require("./db.js")


// COULD NOT IMPLEMENT NESTED QUERIES BECAUSE OF ASYNCH NATURE OF NODE JS
// when i separate the express middleware's rest api and Database query functionality,
// sometimes the response of the request happens before my query completion
// because of asynch nature. so for the case of this project, i have combined
// the model and controller. For future work, ill learn and make it modular
// with MVC STYLE.


// NOT USING THIS FILE
