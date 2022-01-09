const res = require("express/lib/response");
const { use } = require("../routes/users.routes");
const mySql = require("./mysql.connector");

class User{
    constructor(user){
        this.userName = user.userName,
        this.email = user.email,
        this.password = user.password
        this.address = JSON.stringify(user.address);
    }

    //Create user util
    create(newUser, result){
        mySql.query("insert into users set ?", newUser, (err, queryResult) => {
            //propgate error to controller - rare
            if(err){
                console.log("Error incurred while inserting data to DB.\nLocation: User.create");
                result(err, null);
            }
            //return inserted user with generated id to controller
            else{
                newUser.address = JSON.parse(newUser.address);
                result(null, {id: queryResult.insertId, ...newUser});
            }
        });
    }

    //Authenticate user util
    authenticate(user, result){
        mySql.query(`select * from users where userName = '${user.userName}' and password = '${user.password}'`, (err, queryResult) => {
            //internal error, if any - rare
            if(err){
                console.log("Error incurred while authenticating data.\nLocation: User.authenticate");
                result(err, null);
            }
            else{
                //select returned zero rows.Because user with given credentials doesn't exist
                if(queryResult.length == 0)
                    result("User doesn't exist", null);
                //valid user credentials
                else
                    result(null, JSON.parse(JSON.stringify(queryResult[0])));
            }
        });
    }

    //Get all users from DB
    static getAllUsers(req, result){
        mySql.query(`select * from users`, (err, queryResult) => {
            result(null, JSON.parse(JSON.stringify(queryResult)));
        });
    }

    //Get a user by ID
    static getUserById(userId, result){
        mySql.query(`select * from users where userId = ?`, userId, (err, queryResult) => {
            if(err){
                result(err, null);
            }
            else{
                result(null, JSON.parse(JSON.stringify(queryResult)));
            }
        });
    }

    //Update user util
    static updateUser(user, body, result){
        //console.log(user);
        mySql.query(`update users set ? where userId = ${body.userId}`, user, (err, queryResult) => {
            if(err){
                result(err, null);
            }
            else{
                result(null, queryResult);
            }
        })
    }

    //Delete user util
    static deleteUserById(userId, result){
        mySql.query("delete from users where userId = ?", userId, (err, queryResult) => {
            if(err){
                console.log(err);
                result(err, null);
            }
            else{
                result(null, queryResult);
            }
        });
    }
}

module.exports = User;