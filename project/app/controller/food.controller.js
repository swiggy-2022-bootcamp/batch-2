const { foods } = require("../models/");
const db = require("../models/")
const Food = db.food;

exports.create = (req,res) => {
    const food = new Food({
        foodName:req.body.foodName,
        foodCost:req.body.foodCost,
        foodType:req.body.foodType,
    })
    food.save(food).then(data => {
        res.status(201).send(data)
    }).catch(error => {
        res.status(500).send({
            message:"Error while creating food" + error
        })
    })
}
exports.getFoodById = (req,res) => {
    const id = req.params.id;
    Food.findById(id).then(data => {
        if (!data){
            res.status(404).send({
                message:"Food Not found"
            })
        }
        else{
            res.send(data)
        }
    }).catch(error => {
        res.status(500).send({
            message:"Error while getting food"
        })
    })
}
exports.getAllFood = (req,res) => {
    Food.find().then(data => {
        res.send(data)
    }).catch(error => {
        res.status(500).send({
            message:"Error while getting food"
        })
    })
}
exports.deleteFoodById = (req,res) => {
    const id = req.params.id;
    Food.findByIdAndRemove(id,{useFindAndModify:false}).then(data =>{
        if (!data){
            res.status(404).send({
                message:`Sorry food with id ${id} not found`
            })
        }
        else{
            res.send(data)
        }
    }).catch(error => {
        res.status(500).send({
            message:"Error while removing food"
        })
    })
}
exports.findByCuisine = (req,res) => {
    const cuisine = req.params.cuisine;
    Food.find().where("foodType").equals(cuisine).then(data => {
        if (!data){
            res.status(404).send({
                message:"No food with specified cuisine"
            })
        }
        else{
            res.send(data)
        }
    }).catch(error => {
        res.status(500).send({
            message:"Error while getting food"+error
        })
    })
}