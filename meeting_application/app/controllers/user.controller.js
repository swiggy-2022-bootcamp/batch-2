require('dotenv').config();
const db = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = db.users;
const saltRounds = 12;

//register new user
exports.register = async (req,res) => {
    const user = new User({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password
    })

    const exisitngUser = await User.findOne({email:req.body.email});
    if(exisitngUser){
        res.status(501).send({message:"Email already registered."});
    } 
    if(req.body.first_name=="" || req.body.email == "" || req.body.password == ""){
        res.status(501).send({message:"Invalid details."});
    }

    user.password = bcrypt.hashSync(req.body.password, saltRounds);

    user.save(user).then(
        data => {
            res.status(201).send({message: `Hey ${user.first_name} Registration Successful!`,
                                  registration_name: `${user.first_name} ${user.last_name}`}); 
        }
    ).catch(err => {
        res.status(500).send({
            message:err.message ||"error while creating the User."
        })
    })
}

//login
exports.login = async (req,res) => {
    const user = new User({
        email:req.body.email,
        password:req.body.password
    })

    // validate email and password
    try{
        const exisitingUser = await User.findOne({email:req.body.email});

        if(!exisitingUser){
            res.status(501).send({message:"Invalid email!"});
        } else {
            const verified = await bcrypt.compareSync(req.body.password, exisitingUser.password);
            if(verified){
                const accessToken = jwt.sign({_id: exisitingUser._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"12h"});
                res.status(201).send({message: `Hey ${exisitingUser.first_name} Login Successful!`,
                                      token: accessToken});
            } else {
                res.status(501).send("Incorrect credentials. Try again");
            } 
        }
    } catch (e) {
        throw Error(e.message);
    }
}




