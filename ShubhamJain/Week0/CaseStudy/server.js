const express = require("express");
const cors = require("cors");
const app = express();
const logger = require('./app/config/winston');
const bodyParser = require('body-parser');

var corsOptions = {
    origin:"*"
}

app.use(cors(corsOptions));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models")

db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( () => {
    logger.info("connected to db");
}).catch(err => {
    logger.error("cannot connect to db",err)
    process.exit()
})

app.get("/test",(req,res) => {
    res.json({message:"welcome to NodeJS App"})
});

require("./app/routes/user.routes")(app);

const PORT = 8080;
app.listen(PORT,() => {
    logger.info(`server running on port: ${PORT}`);
});