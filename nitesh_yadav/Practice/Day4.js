var http = require("http");
var log = require("./log");
var util = require("util");
var encoder = new util.TextEncoder("utf-8");

//------------------------------------------------------------create server
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello World!");

    log.info("server is running");
    res.end();
  })
  .listen(8080);

//------------------------------------------------------------Connect Mongo DB
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";

const db_name = "sample_db_name";

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log("Not connected...Error in connection");
  } else {
    console.log("DB connected");
  }
});

//------------------------------------------------------------Connect MySQL
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//------------------------------------------------------------send html response
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("<htmp><body><h1>Hello world</h1></body></html>");

    log.info("server is running");
    res.end();
  })
  .listen(8080);

//------------------------------------------------------------create express.js server
var express = require("express");
var app = express();

app.get("/users/get_all_users", (req, res) => {
  console.log("data will printed soon....");
});

app.post("/users/signup", (req, res) => {
  console.log("user signup");
});

app.post("/users/signin", (req, res) => {
  console.log("user signin");
});

app.put("/users/update_user_by_id", (req, res) => {
  console.log("update user data");
});

app.delete("/users/delete_user_by_id", (req, res) => {
  console.log("delete user data");
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
