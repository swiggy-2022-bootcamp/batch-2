const User = require("../models/users.js")

//signup user
const create = (req,res) => {
    const user = new User({
        email:req.body.email,
        password:req.body.password,
        name:req.body.name
    })
    User.create(user,(err,data) =>{
        if(err)
            res.status(500).send({
                message:"internal error"
            })
        else
          res.send(data);
    });
}

//find user by email
const findUserByEmailId = (req,res) => {
    const email = req.params.emailId;
    User.findUserByEmailId(email,(err,data) =>{
        if(err)
            res.status(500).send({
                message:"internal error"
            })
        else
          res.send(data);
    });
}

//update user by email
const updateUserByEmailId = (req,res) => {
    const email = req.params.emailId;
    const updateInfo = new User({
        email:email,
        password:req.body.password||"",
        name:req.body.name||""
    })
    User.updateUserByEmailId(updateInfo,(err,data) =>{
        if(err)
            res.status(500).send({
                message:"internal error"
            })
        else
          res.send(data);
    });
}

//update user by email
const deleteUserByEmailId = (req,res) => {
    const email = req.params.emailId;
    User.deleteUserByEmailId(email,(err,data) =>{
        if(err)
            res.status(500).send({
                message:"internal error"
            })
        else
          res.send(data);
    });
}

module.exports = {
    create,
    findUserByEmailId,
    updateUserByEmailId,
    deleteUserByEmailId
};




