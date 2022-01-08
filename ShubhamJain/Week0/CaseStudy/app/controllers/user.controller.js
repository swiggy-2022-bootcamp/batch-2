const db = require("../models")
const User = db.users;
var logger = require('../config/winston');
const bodyParser = require('body-parser');

//signup user
exports.createUser = (req,res) => {
    const user = new User({
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
        address: {}
    })
    user.address.set("houseNo", req.body.address.houseNo);
    user.address.set("street", req.body.address.street);
    user.address.set("city", req.body.address.city);
    user.address.set("state", req.body.address.state);
    user.address.set("zip", req.body.address.zip);

    logger.info("New user is : ", user);

    user.save(user).then(
        data => {
            res.status(201).send(data);
        }
    ).catch(err => {
        res.status(500).send({
            message:err.message ||"error while creating the User."
        })
    })


}

//fetch all users
exports.findAllUsers = (req,res) => {
    User.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message ||"error while retrieving the users."
        })
    })
}
//fecth user by id
exports.findUserById = (req,res) => {
    const id = req.params.id;
    User.findById(id).then(
        data => {
            if(!data)
              res.status(404).send({message:"User Not Found with Id " + id});
            else
              res.send(data);
        }
    ).catch(err => {
        res.status(500).send({
            message: `Sorry user with Id: [${id}] not found.`
        })
    })
}

exports.updateUserById = (req,res) => {
    const id = req.body._id;

    User.findByIdAndUpdate(id,req.body,{useFindAndModify:false, new:true}).then(
        data => {
            if(!data)
            res.status(404).send({message:"User cannot be updated with Id " + id});
          else
            res.send(data);
        }
    ).catch(err => {
        res.status(500).send({
            message: `Sorry user with Id: [${id}] not found.`
        })
    })
}

exports.deleteUserById = (req,res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id,{useFindAndModify:false}).then(
        data => {
            if(!data)
            res.status(404).send({message:`User cannot be deleted with Id:[${id}]`});
          else
            res.send({message:"User deleted successfully."});
        }
    ).catch(err => {
        res.status(500).send({
            message: `Sorry user with Id: [${id}] not found.`
        })
    })
    
}



