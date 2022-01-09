require('dotenv').config({ path: __dirname + '/.env' });
require('./src/config/dbConn');
require('./src/config/sequelizeConn');

const express = require('express');
const app = express();

const userRoutes = require('./src/routes/usersRoute');
const meetingRoutes = require('./src/routes/meetingsRoute');

const PORT = process.env.PORT;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/meetings', meetingRoutes);

app.listen(PORT, () => {
  	console.log(`Meeting App Running on Port: ${PORT} (http://localhost:${PORT})`);
});