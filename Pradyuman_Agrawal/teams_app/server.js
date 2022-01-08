const express = require("express");
require("dotenv").config();
const cors = require("cors");
const middleware_utils = require('./middleware/utils');

const app = express();

var corsOptions = {
    origin:"*"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(middleware_utils.requestLogger);

app.get("/test",(req,res) => {
    res.json({message:"welcome to NodeJS App"})
});

require("./routes/users")(app);

app.use(middleware_utils.unknownEndpoint);
app.use(middleware_utils.errorHandler);


const PORT = process.env.PORT||3000
app.listen(PORT,() => {
    console.log(`server running on port: ${PORT}`);
});