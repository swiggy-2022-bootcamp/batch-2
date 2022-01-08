const express = require('express');
const app = express();
const userRoutes = require('./app/routes/userRoutes');
require('./app/config/db.config');

app.use(express.json());
app.use('/users', userRoutes);

app.listen(3000, () => {
  	console.log('App listening on port 3000');
});