const express = require("express");
require("dotenv").config();
const cors = require("cors");

const userRouter=require("./routes/users")
const authRouter=require("./routes/auth")

const middleware_utils = require('./middleware/utils');
const auth =require("./middleware/auth")

const app = express();

var corsOptions = {
    origin:"*"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(middleware_utils.requestLogger);

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get("/profile",auth,(req,res)=>{
    res.status(200).send(`Welcome to user profile page ${req.userId} ${req.email}`)
})

app.use(middleware_utils.unknownEndpoint);
app.use(middleware_utils.errorHandler);

const PORT = process.env.PORT||3000
app.listen(PORT,() => {
    console.log(`server running on port: ${PORT}`);
});