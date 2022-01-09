const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config()
const db = require("../models")
const User = db.users;

//signup user
exports.createUser = async(req,res) =>{
    try{
        const {registration_name, username, password} = req.body;
        if(!(registration_name && username && password)){
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({username});
        if(oldUser){
            return res.status(409).send("User already exist. Please login");
        }
        encryptedPassword = await bcrypt.hash(password,10);
        const user = new User({
            registration_name,
            username,
            password:encryptedPassword,
            reputation:0,
        });
        user.save(user);
        res.status(201).send({message:"User Registered successfully","registration-name":user.registration_name});
    }catch(err){
        res.status(500).send({
            message:err.message || "error while creating the user."
        })
    }
    
}

//login
exports.userLogin = async(req,res) => {
    try{
        const {username, password} = req.body;
        if(!(username && password)){
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({username});
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id: user._id, username},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            res.status(201).send({message:"User logged in successfully",token:token});   
        }else{
            res.status(404).send({message:"Invalid credentials"});
        }
    }catch(err) {
        res.status(500).send({
            message:err.message || "error while logging in"
        })
    }
}


//fetch all users
exports.findAllUsers = (req,res) => {
    User.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message || "error while retrieving the users."
        })
    })
}

//fetch user by id
exports.findUserById = (req,res) => {
    const id = req.params.id;
    User.findById(id).then(data => {
        if(!data)
            res.status(404).send({message:"user not found with this id"+id});
        else
            res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message || "error while retrieving the users."
        })
    })
}

//update user details by id
exports.updateUserById = (req,res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body,{userFindAndModify:false}).then(
        data => {
            if(!data)
            res.status(404).send({message:"user cannot be updated with this id"+id});
        else
            res.send({message:"User updated successfully"});
    }).catch(err => {
        res.status(500).send({
            message:err.message || "error while updating the users."
        })
    })
}

exports.deleteUserById = (req,res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id,{userFindAndModify:false}).then(
        data => {
            if(!data)
            res.status(404).send({message:"user cannot be deleted with id" + id});
        else
            res.send({message:"User deleted successfully"});
    }).catch(err => {
        res.status(500).send({
            message:err.message || "error while deleting the user with id: " + id
        })
    })

}