const express = require("express"),
    cors = require("cors"),
    logger = require('morgan'),
    mongooose = require("mongoose");
;    

const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());
app.use(logger("dev"));


//DB connection
mongooose.connect(require("./app/config/db.config").url, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("db connected !!"))
.catch(err =>{
    console.log("err in db connnect ", err);
    process.exit();
});


// initialize routes
require("./app/routes")(app);


//Start Server
const port = require("./app/config/server.config").PORT;
app.listen(port, ()=>{
    console.log("Server started on :"+port);
})