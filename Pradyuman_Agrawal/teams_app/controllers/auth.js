const User = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

//get all user
const login =async (req,res) => {
    //get user input
    const {email,password}=req.body;
    //validate input
    if(!(email&&password)){
        return res.status(400).send("all inputs for login required");
    }
    
    try{
        //check if user exists with same emailId
        const data = await User.findUserByEmailId(email);
        if(data.user.length==0){
            return res.status(400).send(`Sorry user with email ${email} doesnt exists, Trying registering instead`);
        }
        const user = data.user;
        if(await bcrypt.compare(password,user.password)){
            //create token
            const token = jwt.sign(
                {userId:user.userId,email:email},
                process.env.TOKEN_KEY,
                {
                    expiresIn:"24h"
                }
            )
            console.log("User successfully logged in")
            user.token=token;
            return res.status(200).json(user);
        }
        res.status(400).send("Invalid credentials");
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
}

//find user by userId
const logout = (req,res) => {
    res.status(404).send("Endpoint yet to be implemented");
}

module.exports = {
    login,
    logout
};




