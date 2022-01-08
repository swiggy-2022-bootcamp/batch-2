const userRouter = require("./user.routes");

module.exports= app => {

    app.use("/user",userRouter);

    app.get("/ping", (req, res)=> res.send("Pong"));


    //global error handler
    app.use((err, req, res, next)=>{
        console.error("A error occurred!!:"+ err.stack);
        let status = res.locals.status || 500;
        res.status(status).json({
            message: err.message
        })
    })

    console.log("initialized routes");
}