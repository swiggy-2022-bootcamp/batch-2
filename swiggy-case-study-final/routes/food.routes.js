const router = require("express").Router();
const food = require("../controllers/food.controller.js");

//API routes
router.post("/", verifyToken, food.create);
router.get("/:foodID", verifyToken, food.getFoodById);


function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === "undefined"){
        console.log("Unauthorized access observed");
        res.sendStatus(403);
    }
    else{
        bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }
}

module.exports = router;