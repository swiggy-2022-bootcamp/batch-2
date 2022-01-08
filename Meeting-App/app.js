require('dotenv').config({ path: __dirname + '/.env' });
require('./src/config/dbConn');
require('./src/config/sequelizeConn');

const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Meeting Application');
});

app.listen(PORT, () => {
  	console.log(`Meeting App Running on Port: ${PORT} (http://localhost:${PORT})`);
});