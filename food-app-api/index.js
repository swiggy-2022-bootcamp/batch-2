const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to the Food App!");
});

const usersRoute = require('./routes/users');
const foodRoute = require('./routes/food');

app.use(bodyParser.json());
app.use(usersRoute);
app.use(foodRoute)

//const url = 'mongodb://127.0.0.1:27017/food-app'
const url = process.env.DB_URL || DB_URL;
mongoose.connect(url, () => console.log('Connected to DB!'));


//const PORT = 8000;
const port = process.env.API_PORT || API_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});