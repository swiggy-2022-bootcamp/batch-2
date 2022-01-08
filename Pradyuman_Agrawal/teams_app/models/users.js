const pool = require("../config/db")

const User = function(user){
    this.email = user.email;
    this.password = user.password;
    this.name=user.name;
}

User.create = (newUser,cb) => {
    pool.query("INSERT INTO users SET ?",newUser,(err,res) => {
        if(err){
            console.log("error: ",err);
            cb(err,null);
            return;
        }
        console.log("user created",{...newUser});
        cb(null,{id:res.insertId,...newUser});
    });
};

User.findUserByEmailId = (email,cb) => {
    pool.query("Select * from users where email = ?",email,(err,res) => {
        if(err){
            console.log("error: ",err);
            cb(err,null);
            return;
        }
        console.log("user found with email",email);
        cb(null,{user:res});
    });
};

User.updateUserByEmailId = (updateInfo,cb) => {
    var sql=`UPDATE users SET `;
        var arg=[]
        if(updateInfo.name){
            sql+=`name=? ,`;
            arg.push(updateInfo.name);
        }
        if(updateInfo.password){
            sql+=`password=? `;
            arg.push(updateInfo.password);
        }
        sql+= `WHERE email=?`;
        arg.push(updateInfo.email);

        pool.query(sql,arg,(err,res) => {
        if(err){
            console.log("error: ",err)
            cb(err,null);
            return;
        }
        console.log("user info update where email is",updateInfo.email);
        cb(null,{user:res});
    });
};

User.deleteUserByEmailId = (email,cb) => {
    pool.query("Delete from users where email = ?",email,(err,res) => {
        if(err){
            console.log("error: ",err)
            cb(err,null);
            return;
        }
        console.log("user deleted with email",email);
        cb(null,{user:res});
    });
};

module.exports = User;