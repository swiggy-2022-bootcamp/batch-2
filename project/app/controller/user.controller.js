const { users } = require("../models/");
const db = require("../models/")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = db.users;

exports.create = async (req,res) => {

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        email:req.body.email,
        password:hash,
        username:req.body.username,
        address:req.body.address,
    })

    user.save(user).then(
        data => {
            res.status(201).send(data);
        }
    ).catch(err => {
        res.status(500).send(() => {
            res.send("Error")
        })
    })
}
exports.findAllUsers = (req,res) => {
    User.find().then(data => {
        res.send(data)
    }).catch(error => {
        res.status(500).send({
            message:error || "Error"
        })
    })
}
exports.findUserById = (req,res) => {
    const id = req.params.id;
    User.findById(id).then(data => {
        if(!data){
            res.status(404).send({
                message:`Sorry user with id ${id} not found`
            })
        }
        else{
            res.send(data)
        }
    }).catch(error =>{
        res.status(500).send({
            message:"Error" + error
        })
    })
}
exports.updateUserById = async (req,res) => {
    const id = req.body.id
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt)
    req.body.password = hash
    User.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(data => {
        if (!data){
            res.status(404).send({
                message:`Sorry user with id ${id} not found`
            })
        }
        else{
            res.send(req.body)
        }
    }).catch(error => {
        res.status(500).send({
            message:"Error while updating user" + error
        })
    })
}
exports.deleteUserById = (req,res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id,{useFindAndModify:false}).then(data =>{
        if (!data){
            res.status(404).send({
                message:`Sorry user with id ${id} not found`
            })
        }
        else{
            res.send({
                message:"User deleted successfully"
            })
        }
    }).catch(error => {
        res.status(500).send({
            message:"Error while removing user"
        })
    })
}
exports.authenticate = async (req,res) => {
    const user = await User.findOne({email:req.body.email});
    if (!user){
        res.status(404).send({
            message:"User not found"
        })
    }
    const password = await bcrypt.compare(req.body.password,user.password).catch(error => {
        res.status(403)
    })
    if (!password){
        res.send("Invalid password")
    }
    const token = jwt.sign({_id:user._id},process.env.TOKEN);
    res.header("authToken",token);
    res.send("User logged in succesful");
}