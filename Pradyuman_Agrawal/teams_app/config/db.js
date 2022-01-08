const mysql = require("mysql");

var pool = mysql.createPool({
    host:process.env.SQL_ENDPOINT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    connectionLimit : 10
    //multipleStatements: true
})

module.exports = pool;

