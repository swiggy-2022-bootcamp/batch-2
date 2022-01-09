const mySql = require("mysql");
const dbConfig = require("../config/db.config");

//connect to a persistent system
const connection = mySql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB_Name
});

module.exports = connection;