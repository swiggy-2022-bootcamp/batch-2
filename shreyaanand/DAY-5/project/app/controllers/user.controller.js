const db = require('../models');
const User = db.users.User;

//signup user
exports.create = (req,res) => { 
    const user = new User({
        email:req.body.email,
        password:req.body.password
    })

    user.save(user).then(
        data => {
            res.send(data)
        }
    ).catch(err => {
        res.status(500)({
            message:err.message ||"Error while creating the user!!"
        })
    })
}

//fetch all user
