// This defines the endpoints used to respond to requests related to users.

module.exports = app => 
{
    const users = require("../controllers/User_Controller.js");
    const router = require("express").Router();
    
    router.post("/registerUser",users.createUser);
    router.get("/listAllUsers",users.listAllUsers)
    router.post("/login",users.loginUser);
    
    app.use("/users",router);
}