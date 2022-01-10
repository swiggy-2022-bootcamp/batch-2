if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const cors = require("cors");
const logger = require('./app/config/winston');
const db = require("./app/models");
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./app/config/passport.config')
const helper = require('./helper')
initializePassport(passport)

var corsOptions = {
    origin:"*"
}

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


require("./app/routes/user.routes")(app);
require("./app/routes/food.routes")(app);
require("./app/routes/login.routes")(app, passport);

db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( () => {
    logger.info("connected to db");
}).catch(err => {
    logger.error("cannot connect to db",err)
    process.exit()
})

app.listen(process.env.PORT,() => {
    logger.info(`server running on port: ${process.env.PORT}`);
});