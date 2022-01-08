const express = require('express');
const cors = require("cors");
const port = 4000;

const corsOptions = {
    origin:"*"
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Routes
const registerRoute = require('./routes/register');


app.use('/api/register', registerRoute);

app.listen(port, () => {
    console.log("Connection successful port : ", port);
});