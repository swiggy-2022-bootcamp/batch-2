const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rahul',
    database: 'testdb'
});

connection.connect((err) => {
    if (err) {
      return console.error('Something went wrong!!! : ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

module.exports = connection;