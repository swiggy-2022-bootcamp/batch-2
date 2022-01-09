const sql = require("./db.js")

const User = function(user){
    this.email = user.email;
    this.password = user.password;
}

User.create = (newUser,result) => {
    sql.query("INSERT INTO users SET ?",newUser,(err,res) => {
        if(err){
            console.log("error: ",err)
            result(err,null);
            return;
        }
        console.log("user created",{...newUser});
        result(null,{id:res.insertId,...newUser});
    });
};

module.exports = User;