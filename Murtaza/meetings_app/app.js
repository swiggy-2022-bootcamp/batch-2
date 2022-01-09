const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
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

const usersRouter = require('./controller/routes/users');

const uri = `mongodb+srv://${config.get('app.db.username')}:${config.get('app.db.password')}@cluster0.juzyy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected')
})
.catch(err => console.log(err))

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.raw());

app.use('/user', usersRouter);

app.listen(config.get('app.port'), function() {
    console.log(`App listening on ${config.get('app.port')}`);
})

module.exports = app;
