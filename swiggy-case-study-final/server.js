const jwt = require("jsonwebtoken");
const express = require("express");

const foodRouter = require("./routes/food.routes")
const userRouter = require("./routes/users.routes")
const env = require("./config/environment.config");

const app = express();

const swaggerDocument = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

//all routes shall be accessible only if valid, un-expired token is observed.
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/food", foodRouter);

/*
app.post("/api/login", (req, res) => {
    user = {
        id: 1,
        email: "a@gmail.com",
        uname: "aa"
    };

    jwt.sign(user, "private key", {expiresIn: 60*60}, (err, token) => {
        res.json({
            token
        });
    });
});

app.get("/api/users", verifyToken, (req, res) => {
    jwt.verify(req.token, "private key", (err, authData) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: "users",
                authData
            });
        }
    });
});

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === "undefined"){
        console.log("u");
        res.sendStatus(403);
    }
    else{
        bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }
}

*/
const server = app.listen(env.PORT, 
    () => console.log(`Server has started at port ${env.PORT}`));