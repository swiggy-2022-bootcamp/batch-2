const mysql = require("mysql");

const pool = mysql.createPool({
    host:process.env.SQL_ENDPOINT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    connectionLimit : 10,
    multipleStatements: true
})

pool.promise = (sql,args) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, args,(err, result) => {
          if(err){reject(err);}
          else{resolve(result);}
        });
    });
};

module.exports = pool;

