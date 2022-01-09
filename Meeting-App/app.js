require('dotenv').config({ path: __dirname + '/.env' });
require('./src/config/db-config');
require('./src/config/sequelize-config');

const express = require('express');
const app = express();

const userRoutes = require('./src/routes/users-route');
const meetingRoutes = require('./src/routes/meetings-route');
const teamRoutes = require('./src/routes/teams-route');

const PORT = process.env.PORT;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/meetings', meetingRoutes);
app.use('/teams', teamRoutes);

app.listen(PORT, () => {
  	console.log(`Meeting App Running on Port: ${PORT} (http://localhost:${PORT})`);
});