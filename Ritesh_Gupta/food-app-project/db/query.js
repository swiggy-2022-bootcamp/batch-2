const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const query = sql => {
    return new Promise( ( resolve, reject ) => {

        let connection = mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        });
        
        console.log('Inside query.js file');
        connection.query( sql, ( err, rows ) => {
            if ( err )
            {   
                connection.rollback();
                connection.end();
                reject( err );
            }
            else
            {
                connection.commit();
                connection.end();
                resolve( rows );
            }
        });
    });
}

module.exports = query;