const express = require("express");
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

require("./app/routes/user_routes")(app);
require("./app/routes/question_routes")(app);
require("./app/routes/answer_routes")(app);

const PORT = 8080;
app.listen(PORT,() => {
    console.log(`server running on port: ${PORT}`);
});