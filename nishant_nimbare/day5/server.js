const express = require("express"),
    cors = require("cors")
;    

const app = express();

let corsOptions = {
    origin:"*"
};

app.use(cors(corsOptions));
app.use(express.json());

const db = require("./app/models");
db.mongooose.connect(db.url, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("db connected !!"))
.catch(err =>{
    console.log("err in db connnect ", err);
    process.exit();
});

app.get("/ping", (req, res)=> res.send("Pong"));

require("./app/routes/user.routes")(app);

const PORT = 8765;
app.listen(PORT, ()=>{
    console.log("Server started on :"+PORT);
})