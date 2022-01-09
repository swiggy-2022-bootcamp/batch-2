require("dotenv").config()
const express = require("express");
const app = express();

const UserRouter = require("./api/users/user.router");
const FoodRouter = require("./api/foods/foods.router")

app.use(express.json());

app.use("/api/users", UserRouter);
app.use("/api/foods", FoodRouter);

// app.get("/api", (req,res)=>{
//     res.json({
//         success:1,
//         message:"This is working!"
//     });
// } );

app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running on port: ", process.env.APP_PORT);
})