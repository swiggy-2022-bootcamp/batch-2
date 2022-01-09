// This file is for Creating connection to the database to facilitate all our queries.

const util = require('util');
const mysql = require('mysql' );
const dbConfig = require('./db_config.js')

function getDbConnection() 
{
  const connection = mysql.createConnection(
      {
        host:dbConfig.HOST,
        user:dbConfig.USER,
        password:dbConfig.PASSWORD,
        database:dbConfig.DB
       });
  
  return {
    query(sql, args) {
      return util.promisify(connection.query)
        .call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    }
  };
}

module.exports = {getDbConnection};
