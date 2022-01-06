let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rahul'
});

connection.connect((err) => {

    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});
  
