const express = require("express");
const cors = require("cors");
const auth = require("./app/middleware/auth.js");
const app = express();

var corsOptions = {
    origin:"*"
}

app.use(cors(corsOptions));
app.use(express.json())

const db = require("./app/models")
db.mongoose.connect(db.url,{
    useUnifiedTopology:true
}).then( () => {
    console.log("connected to db");
}).catch(err => {
    console.log("cannot connect to db",err)
    process.exit()
})

app.post("/test", auth, (req,res) => {
    res.status(200).send("Welcome app");
});

require("./app/routes/user.routes")(app);

app.listen(process.env.PORT, () => {
    console.log(`server running on port: ${process.env.PORT}`)
})