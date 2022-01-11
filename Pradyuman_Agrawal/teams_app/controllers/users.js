const User = require("../models/users.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//signup user
const create = async (req,res) => {

    //get user input
    const {name,email,password}=req.body;

    //validate user input
    if(!(email&&password&&name)){
       return res.status(400).send("All user inputs are required");
    }
    
    try{
        //check if user exists with same emailId
        const data = await User.findUserByEmailId(email);
        if(data.user.userId){
            return res.status(400).send(`Sorry user with email ${email} already exists, Trying logging instead`);
        }       
        //encrpyt user password
        encryptedPassword =await bcrypt.hash(password,10)

        const user = new User({
            email:email,
            password:encryptedPassword,
            name:name
        })
        const result = await User.create(user);
        //create token
        const token = jwt.sign(
            {userId:result.id,email:email},
            process.env.TOKEN_KEY,
            {
                expiresIn:"24h"
            }
        )
        console.log("User successfully logged in")
        result.token=token;

        res.status(201).send(result);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
}

//get all user
const getAllUser = async (req,res) => {
    try{
        const data = await User.getAllUser();
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
}

//find user by userId
const findUserById = async (req,res) => {
    const userId = req.params.id;
    try{
        const data = await User.findUserById(userId);
        console.log(data)
        return res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
}

//update user by userId
const updateUserById = async (req,res) => {
    const userId = req.params.id;
    const updateInfo = new User({
        email:req.body.email||"",
        password:req.body.password||"",
        name:req.body.name||""
    })
    if(updateInfo.password){
        updateInfo.password=await bcrypt.hash(updateInfo.password,10)
    }
    try{
        const data = await User.updateUserById(userId,updateInfo);
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
}

//delete user by userId
const deleteUserById = async (req,res) => {
    const userId = req.params.id;
    try{
        const data = await User.deleteUserById(userId);
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message:"internal error"
        })
    }
}

module.exports = {
    create,
    getAllUser,
    findUserById,
    updateUserById,
    deleteUserById
};




