require('./config/config');
require('./config/mongoconfig');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const userRouter = require('./routes/user.router');
const foodRouter = require('./routes/food.router');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./config/swiggy-backend-api-v0.0.1.json');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use('/api', userRouter);
app.use('/api', foodRouter);

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


app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));