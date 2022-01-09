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

User.getAllUser = (cb) => {
    pool.query("Select * from users ",(err,res) => {
        if(err){
            console.log("error: ",err);
            cb(err,null);
            return;
        }
        console.log("All users info sent");
        cb(null,{users:res});
    });
};

User.findUserById = (userId,cb) => {
    pool.query("Select * from users where userId = ?",userId,(err,res) => {
        if(err){
            console.log("error: ",err);
            cb(err,null);
            return;
        }
        console.log("User found with userId",userId);
        cb(null,{user:res[0]});
    });
};

User.findUserByEmailId = (email,cb) => {
    pool.query("Select * from users where email = ?",email,(err,res) => {
        if(err){
            console.log("error: ",err);
            cb(err,null);
            return;
        }
        if(res.length){
            console.log("user found with email",email);
            cb(null,{user:res[0]});
        }
        else{
            cb(null,{user:[]});
        }
    });
};

User.updateUserById = (userId,updateInfo,cb) => {
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
        sql+= `WHERE userId=?`;
        arg.push(userId);

        pool.query(sql,arg,(err,res) => {
        if(err){
            console.log("error: ",err)
            cb(err,null);
            return;
        }
        console.log("user info update where userId is",userId);
        cb(null,{user:res});
    });
};

User.deleteUserById = (userId,cb) => {
    pool.query("Delete from users where userId = ?",userId,(err,res) => {
        if(err){
            console.log("error: ",err)
            cb(err,null);
            return;
        }
        console.log("user deleted with userId",userId);
        cb(null,{user:res});
    });
};

module.exports = User;