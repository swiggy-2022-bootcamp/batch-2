const pool = require("../config/db")

const User = function(user){
    this.email = user.email;
    this.password = user.password;
    this.name=user.name;
}

User.create = async (newUser) => {
    try{
        const res = await pool.promise("INSERT INTO users SET ?",newUser);
        console.log("user created",{...newUser});
        const resultObj={id:res.insertId,...newUser};
        return resultObj;
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }

};

User.getAllUser =async () => {
    try{
        const res = await pool.promise("Select * from users ",[]);
        console.log("All users info sent");
        return {users:res};
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

User.findUserById = async(userId) => {
    try{
        const res = await pool.promise("Select * from users where userId = ?",userId);
        if(res.length){
            console.log("user found with userID",userId);
            return {user:res[0]};
        }
        else{
            return {user:[]};
        }
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

User.findUserByEmailId =async (email) => {
    try{
        const res = await pool.promise("Select * from users where email = ?",email);
        if(res.length){
            console.log("user found with email",email);
            return {user:res[0]};
        }
        else{
            return {user:[]};
        }
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

User.updateUserById =async (userId,updateInfo,) => {
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

        try{
            const res = await pool.promise(sql,arg);
            console.log("user info update where userId is",userId);
            return {user:res}
        }
        catch(err){
            console.log("error: ",err);
            throw err;
        }
};

User.deleteUserById = async (userId) => {
    try{
        const res = await pool.promise("Delete from users where userId = ?",userId);
        console.log("user deleted with userId",userId);
        return {user:res}
    }
    catch(err){
        console.log("error: ",err);
        throw err;
    }
};

module.exports = User;