const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const questionRouter = require('./routers/question');

const app = express();
// port
const PORT = 3000;

// using express to parse incoming json to an object
app.use(express.json());

// setting up router
app.use(userRouter);
app.use(questionRouter);


app.listen(PORT, () => {
    console.log('Server is running on ' + PORT);
});
