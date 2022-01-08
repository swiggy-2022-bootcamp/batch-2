
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Meetings Application',
            description: 'An application for meeting schedule management',
            contact: {
                name: 'Murtaza Sadriwala'
            },
            servers: [`http://${config.get('app.host')}:${config.get('app.port')}`]
        }
    },
    apis: ['.routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(config.get('app.port'), function() {
    console.log(`App listening on ${config.get('app.port')}`);
})

module.exports = app;
