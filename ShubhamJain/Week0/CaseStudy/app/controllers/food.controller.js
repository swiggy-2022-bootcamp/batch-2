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

exports.findFoodItemById = (req, res) => {
    const id = req.params.id;

    Food.findById(id).then(
        data => {
            res.status(200).send(data);
        }
    ).catch(err=>{
        res.status(500).send({message: `Sorry Food Item with Id: [${id}] not found.`});
    })

}

exports.deleteFoodItemById = (req, res) => {
    const id = req.params.id;
    Food.findByIdAndRemove(id,{useFindAndModify:false}).then(
        data =>{
            if(!data)
                res.status(404).send();
            else 
                res.send({message: `Deleted Food Item with Id:[${id}] Successfully.`});
        }
    ).catch(err=>{
        res.status(500).send({message: err.message || `Sorry user with Id:[${id}] not found.`})
    })
}

exports.updateFoodItemById = (req, res) => {
    const id = req.body._id;
    Food.findByIdAndUpdate(id, req.body, {useFindAndModify:false, new:true}).then(
        data =>{
            res.send(data);
        }
    ).catch(err=>{
        res.status(500).send({message: `Cannot find and update the Food Item with Id:[${id}]`})
    })
}