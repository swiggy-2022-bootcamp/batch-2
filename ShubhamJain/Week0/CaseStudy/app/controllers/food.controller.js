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
            message:err.message || "error while retrieving messages."
        })
    })
}