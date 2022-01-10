const db = require("../models")
const User = db.users;

//register new user
exports.register = async (req,res) => {
    const user = new User({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password
    })

    const exisitngUser = await User.findOne({email:req.body.email});
    if(exisitngUser){
        res.status(501).send({message:"Email already registered."});
    } 
    if(first_name=="" || email == "" || password == ""){
        res.status(501).send({message:"Invalid details."});
    }

    user.save(user).then(
        data => {
            // res.status(201).send(data);
            res.status(201).send({message: `Hey ${user.first_name} Registration Successful!`,
                                  registration_name: `${user.first_name} ${user.last_name}`}); 
        }
    ).catch(err => {
        res.status(500).send({
            message:err.message ||"error while creating the User."
        })
    })
}

//login
exports.login = async (req,res) => {
    const user = new User({
        email:req.body.email,
        password:req.body.password
    })

    // validate email and password
    try{
        const exisitngUser = await User.findOne({email:req.body.email});

        if(!exisitngUser){
            res.status(501).send({message:"Invalid email!"});
        } else {
            const isPasswordValid = exisitngUser.password.localeCompare(req.body.password);
            if(isPasswordValid == 0){ 
                // 1. hash the password 2. generate token
                res.status(201).send({message: `Hey ${exisitngUser.first_name} Login Successful!`,
                                      token: ""});
            } else {
                res.status(501).send("Incorrect credentials. Try again");
            } 
        }
    } catch (e) {
        throw Error(e.message);
    }
}

// // for adding meetings
// exports.updateUserById = (req,res) => {
//     const id = req.params.id;
//     { $addToSet: { locations: ["New York", "Texas", "Detroit"] } },
//     User.updateOne({_id:id}, { $addToSet: {meeting: } },   )

//     User.findByIdAndUpdate(id,req.body,{options.overwrite=false}).then(
//         data => {
//             if(!data)
//             res.status(404).send({message:"User cannot be updated with Id " + id});
//           else
//             res.send({message:"User updated successfully"});
//         }
//     ).catch(err => {
//         res.status(500).send({
//             message:err.message ||"error Updating the user with id " + id
//         })
//     })
// }















    // User.findOne({ "email" : req.body.email }, function (err, docs) {try {
            
    //     if (err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log("Result : ", docs);
    //         res.send(docs);
    //     }
    // });

    // User.findOne({email: `${req.body.email}`}).then(
    //         data => {
    //             if(!data)
    //                 res.status(501).send({message:"Invalid email!"});
    //             else
    //                 res.status(201).send("login Successful!");
    //         }
    //     ).catch(err => {
    //         res.status(500).send({
    //             message:err.message ||"error while retrieving the user"
    //         })
    //     })


// //fetch all users
// exports.findAllUsers = (req,res) => {
//     User.find().then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message:err.message ||"error while retrieving the users."
//         })
//     })
// }
// //fecth user by id
// exports.findUserById = (req,res) => {
//     const id = req.params.id;
//     User.findById(id).then(
//         data => {
//             if(!data)
//               res.status(404).send({message:"User Not Found with Id " + id});
//             else
//               res.send(data);
//         }
//     ).catch(err => {
//         res.status(500).send({
//             message:err.message ||"error while retrieving the user with id " + id
//         })
//     })
// }

// exports.updateUserById = (req,res) => {
//     const id = req.params.id;

//     User.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(
//         data => {
//             if(!data)
//             res.status(404).send({message:"User cannot be updated with Id " + id});
//           else
//             res.send({message:"User updated successfully"});
//         }
//     ).catch(err => {
//         res.status(500).send({
//             message:err.message ||"error Updating the user with id " + id
//         })
//     })
// }

// exports.deleteUserById = (req,res) => {
//     const id = req.params.id;
//     User.findByIdAndRemove(id,{useFindAndModify:false}).then(
//         data => {
//             if(!data)
//             res.status(404).send({message:"User cannot be deleted with Id " + id});
//           else
//             res.send({message:"User deleted successfully"});
//         }
//     ).catch(err => {
//         res.status(500).send({
//             message:err.message ||"error deleting the user with id " + id
//         })
//     })
    
// }





