const User = require("../models/users.js")

//signup user
const create = async (req,res) => {

    //get user input
    const {name,email,password}=req.body;

    //validate user input
    if(!(email&&password&&name)){
       return res.status(400).send("All user inputs are required");
    }

    //check if user exists with same emailId
    User.findUserByEmailId(email, (err, data) => {
        if (err){
            res.status(500).send({
                message: "internal error"
            });
        }
        else if(data.user.length){
            res.status(400).send(`Sorry user with email ${email} already exists, Trying logging instead`);
    
        }
        else{
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
    })
}

//get all user
const getAllUser = (req,res) => {
    User.getAllUser((err,data) =>{
        if(err)
            res.status(500).send({
                message:"internal error"
            })
        else
          res.send(data);
    });
}

//find user by userId
const findUserById = (req,res) => {
    const userId = req.params.id;
    User.findUserById(userId,(err,data) =>{
        if(err)
            res.status(500).send({
                message:"internal error"
            })
        else
          res.send(data);
    });
}

//update user by userId
const updateUserById = (req,res) => {
    const userId = req.params.id;
    const updateInfo = new User({
        email:req.body.email||"",
        password:req.body.password||"",
        name:req.body.name||""
    })
    User.updateUserById(userId,updateInfo,(err,data) =>{
        if(err)
            res.status(500).send({
                message:"internal error"
            })
        else
          res.send(data);
    });
}

//delete user by userId
const deleteUserById = (req,res) => {
    const userId = req.params.id;
    User.deleteUserById(userId,(err,data) =>{
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
    getAllUser,
    findUserById,
    updateUserById,
    deleteUserById
};




