const pool = require("../config/db")

const User = function(user){
    this.email = user.email;
    this.password = user.password;
    this.name=user.name;
}

User.create = (newUser,cb) => {
    pool.query("INSERT INTO users SET ?",newUser,(err,res) => {
        if(err){
            console.log("error: ",err)
            cb(err,null);
            return;
        }
        console.log("user created",{...newUser});
        cb(null,{id:res.insertId,...newUser});
    });
};

module.exports = User;