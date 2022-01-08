const express = require('express');
const cors = require("cors");
const port = 4000;

const corsOptions = {
    origin:"*"
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());


const registerRoute = require('./routes/register');
const authenticateRoute = require('./routes/authenticate');
const userRoutes = require('./routes/users');
const foodRoutes = require('./routes/food');

app.use('/api/register', registerRoute);
app.use('/api/authenticate', authenticateRoute);
app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);


app.listen(port, () => {
    console.log("Connection successful port : ", port);
});



