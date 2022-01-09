require('./config/config');
require('./config/mongoconfig');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// Import routers
const userRouter = require('./routes/user.router');
const foodRouter = require('./routes/food.router');

// Swagger dependency
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./config/swiggy-backend-api-v0.0.1.json');

var app = express();

// Enable parsing of json request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Initialize PassportJS
app.use(passport.initialize());

// Register the application routes
app.use('/api', userRouter);
app.use('/api', foodRouter);

// Register the swagger ui path
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    } else {
        console.log(err);
    }
});

// Listen for incoming requests
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));