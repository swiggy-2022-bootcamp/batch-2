require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const config = require("./config");

const auth = require("./middleware/auth");


const app = express();

//req can be made from any where
var corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));
//check them out
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//connecting db
mongoose.connect(config.db.url).then(() => {
    console.log("connected to db");
}).catch(err => {
    console.log("cannot connect to db", err)
    process.exit()
})

require("./routes/user.routes")(app);
require("./routes/question.routes")(app);
require("./routes/answer.routes")(app);

//testing server
app.get("/test", auth, (req, res) => {
    res.status(200).json({ message: "welcome to StackOverFlow" });
});


app.listen(process.env.PORT, () => {
    console.log("server running");
});