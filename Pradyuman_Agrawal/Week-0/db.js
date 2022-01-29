const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(`SELECT * FROM user_db.user`, function(err, result, fields) {
        if (err)
            console.log(err);
        if (result)
            console.log(result);
    });
    con.end();
});