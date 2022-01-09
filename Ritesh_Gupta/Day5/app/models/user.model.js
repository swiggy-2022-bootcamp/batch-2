const sql = require("./db");

const User = function(user){
    this.email = user.email;
    this.password = user.password;
}


User.createUser = (newUser, result) => {
    sql.query("INSERT INTO users SET?", newUser, (err, result)=>{
        if(err) {
            console.log("Error : ", err);
            result(err, null);
            return;
        }

        console.log("user created", {id : result})

    })
}