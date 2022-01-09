const express = require('express');
const jwt = require('jsonwebtoken');
const usersController = require('../controller/users.controller');


const JWT_SECRECT_KEY = process.env.JWT_SECRECT_KEY;

const router = express.Router();


const validateAccessToken = async (req, res, next) => {
    
    try{
    const accessToken = req.headers['authorization'].split(" ")[1];
    console.log("Access Token from client -->", accessToken);

        const result = await jwt.verify(accessToken , JWT_SECRECT_KEY);
        console.log(result)
    
    }
    catch(err){
        console.log(err.message)
        req.body.validToken = false;
        const tokenMessage = err.message;

        if (tokenMessage === 'invalid token' || tokenMessage === 'invalid signature' || tokenMessage === 'jwt malformed'){
            res.status(404).json({
                status : "Failed",
                message : "Invalid Token", 
            })
        }

        else {
            res.status(404).json({
                status : "Failed",
                message : err.message, 
            })
        }
        
        return;
    }

    next();

}

router.use(validateAccessToken);


// get all users
router.get('/', usersController.getAllUsers);


// get user by id
router.get('/:userid', usersController.getUserById);

// update user
router.put('/update', usersController.updateUser);

// delete user by id
router.delete('/:userid', usersController.deleteUserById)


module.exports = router;


