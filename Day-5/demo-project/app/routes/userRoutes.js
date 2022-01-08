const routes = require('express').Router();
const conn = require('../config/db.config');

routes.get('/', (req, res) => {
    conn.query('SELECT * FROM test', (err, result) => {
        if (!err) {
            res.send(result);
        }
    });
});

module.exports = routes;