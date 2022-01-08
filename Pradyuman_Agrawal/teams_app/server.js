const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

var corsOptions = {
    origin:"*"
}

app.use(cors(corsOptions));
app.use(express.json())

app.get("/test",(req,res) => {
    res.json({message:"welcome to NodeJS App"})
});

require("./app/routes/user.routes")(app);

const PORT = process.env.PORT||3000
app.listen(PORT,() => {
    console.log(`server running on port: ${PORT}`);
});