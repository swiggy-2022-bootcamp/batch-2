const express = require('express');
const jwt = require('jsonwebtoken');
const foodController = require('../controller/food.controller');


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

router.use(validateAccessToken);   //passing middleware

// get all food
router.get('/', foodController.getAllFood);

// add new food
router.post('/addFood', foodController.insertFoodDetails);

// get good by id
router.get('/:foodid', foodController.getFoodById);

// get food by type
router.get('/foodType/:foodType', foodController.getFoodByType);



module.exports = router;