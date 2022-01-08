const User = require("../models/users.js")

//signup user
exports.create = (req,res) => {
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





