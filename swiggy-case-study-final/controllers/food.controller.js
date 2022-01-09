const Food = require("../models/food.model");
const jwt = require("jsonwebtoken");
const e = require("express");
const env = require("../config/environment.config");

const allowedFoodTypes = env.ALLOWED_FOOD_TYPES;

function verifyJWTToken(req){
    jwt.verify(req.token, env.JWT_SECRET_KEY, (err, authData) => {
        if(err){
            return -1;
        }
        return 1;
    });
}

// Create/Add new food
exports.create = (req, res) => {
    if(verifyJWTToken(req) == -1){
        res.status(403);
        return;
    }

    const food = new Food(req.body);
    if(!allowedFoodTypes.has(food.foodType)){
        res.status(400);
        res.json({
            message: `Food type can only be ${Array.from(allowedFoodTypes)}`
        });
        return;
    }

    //call to model cum service layer
    food.create(food, (err, result) => {
        if(err){
            //error type: foodId, which is a field in req body is duplicate. So status is BAD_REQUEST.
            if(err.code == "ER_DUP_ENTRY"){
                res.status(400);
                res.json({
                    message: `Food with foodId ${req.body["foodId"]} already exists`
                });
            }
            //Any other internal server error - extremely unlikely
            else{
                res.sendStatus(500);
                console.log(err.code);
            }
        }
        //successful creation
        else{
            res.status(201);
            res.json({
                result
            });
        }
    });
}

// Get food item by ID
exports.getFoodById = (req, res) => {
    if(verifyJWTToken(req) == -1){
        res.status(403);
        return;
    }

    //pass path param as arguemet to the function at service/model layer
    Food.getFoodById(req.params["foodID"], (err, result) => {
        //Any other internal server error - extremely unlikely
        if(err){
            res.sendStatus(500);
            console.log(err);
        }
        else{
            //food with given ID not found
            if(result.length == 0){
                res.status(404);
                res.json({
                    message: "Sorry, food not found"
                });
            }
            //food found
            else{
                res.status(201);
                res.json({
                    result
                });
            }
        }
    });
}