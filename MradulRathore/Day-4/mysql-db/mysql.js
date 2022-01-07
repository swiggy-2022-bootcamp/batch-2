var mysql = require('mysql')

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

conn.connect(function (err) {
    if (!err) {
        console.log("connected")
    }
    else
        throw err
})