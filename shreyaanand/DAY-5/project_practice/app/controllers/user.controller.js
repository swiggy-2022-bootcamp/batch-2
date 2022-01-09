const User = require("../models/user.model.js")

//signup user
exports.create = (req,res) => {
    const user = new User({
        email:req.body.email,
        password:req.body.password
    })

    User.create(user,(err,data) =>{
        if(err)
            res.status(500).send({
                message:"error"
            
            })
        else  
          res.send(data);
    });


}





