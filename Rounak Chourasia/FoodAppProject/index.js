const express = require("express") // Express
// const bodyParser = require("body-parser") // for taking incoming post request body

const apiRoutes = require('./routes/api.js')
const userRoutes = require('./routes/users.js')
const foodRoutes = require('./routes/food.js')
const mongoose = require('mongoose')
require('dotenv').config();


const app = express();
// const PORT_NUM = 5000;
// const dbUrl = 'mongodb://localhost/foodAppDB'
// const port = process.env.PORT_NUM;
// const dbUrl = process.env.DB_URL;
const { PORT_NUM, DB_URL } = process.env;


mongoose.connect(DB_URL, { useNewUrlParser: true })
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => console.log("Connected successfully"));

app.use(express.json()) // to parse incoming req as JSON


// Routes
app.use('/api', apiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);

app.get('/', (req, res) => res.send("Welcome to Food App"));

// Setting port no. for Express to listen on
app.listen(PORT_NUM, () => console.log(`Food App is listening on http://localhost:${PORT_NUM}`));