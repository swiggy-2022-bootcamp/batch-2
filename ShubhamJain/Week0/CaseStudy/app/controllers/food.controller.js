const db = require("../models");
const Food = db.foods;
var logger = require('../config/winston');
const bodyParser = require('body-parser');

exports.findAllFoods = (req, res) =>{
    Food.find().then(
        data => {
            res.send(data);
        }
    ).catch(err=>{
        res.send(500).send({
            message:err.message || "error while retrieving food items."
        })
    })
}

exports.createFoodItem = (req, res) => {
    const food = new Food({
        foodId: req.body.foodId,
        foodName: req.body.foodName,
        foodCost: req.body.foodCost,
        foodType: req.body.foodType
    })
    food.save(food).then(data=>{
        res.status(201).send(data);
    }).catch(
        err=>{
            res.status(500).send({
                message: err.message || "error while creating the Food item."
            })
        }
    )
}