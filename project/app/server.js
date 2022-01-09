const express = require("express")
const cors = require("cors")
const app = express()

var corsOptions = {
    origin:"*"
}

app.use(cors(corsOptions))
app.use(express.json())

const db = require("./models/")
db.mongoose.connect(db.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( () =>{
    console.log("Connected to db");
}).catch(error => {
    console.log("Error connecting to db" + error);
    process.exit();
})


const port = 8080;
app.get("/connect",(req,res) => {
    res.send("Connected")
})
require("./routes/userRoutes.js")(app)
require("./routes/foodRoutes.js")(app)
app.listen(port,(req,res) => {
    console.log("Connected")
})