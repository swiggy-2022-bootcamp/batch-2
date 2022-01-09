const router = require("express").Router();
const users = require("../controllers/user.controller.js");

//API routes
router.post("/register", users.create);
router.post("/authenticate", users.authenticate);
router.get("/", verifyToken, users.getAllUsers);
router.get("/:userID", verifyToken, users.getUserById);
router.put("/", verifyToken, users.updateUser);
router.delete("/:userID", verifyToken, users.deleteUserById);

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

