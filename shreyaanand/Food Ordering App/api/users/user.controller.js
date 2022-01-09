const { create, getUserById, getUsers, updateUser, deleteUser, getUserByUsername } = require('./user.service');

const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const { sign } = require("jsonwebtoken")

module.exports = {
    createUser:(req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({ 
                    success: 0, 
                    message: "Database Connection Failed!"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
    getUserById :(req,res) => {
        const id = req.params.id;
        getUserById(id,(err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
               return res.json({
                   success:0,
                   message: "Record does not exist!"
               }); 
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers :(req,res) => {
        getUsers((err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser( body, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                message: "User updated successfully!"
            })
        })
    },
    deleteUser: (req, res) => {
        const data = req.body;
        updateUser(data, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Failed to update user!"
                });
            }
            return res.json({
                success:1,
                message: "User deleted successfully!"
            });
        });
    },
    getUserByUsername: (req,res) => {
        const body = req.body;
        getUserByUsername(body.username, (err, results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                res.json({
                    success:0, 
                    data:"Invalid Username or Password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result:results},"qwe1234", {expiresIn: "1h"});
                return res.json({
                    success:1, 
                    message: "Logged in successfully!",
                    token: jsontoken
                });
            }
            else{
                res.json({
                    success:0, 
                    data: "Invalid username or password!"
                });
            }
        });
    }
}