var ObjectId = require('mongoose').Types.ObjectId;

var Food = require('../models/food.model');


module.exports.getFoods = (req, res) => {
    // #swagger.tags = ['Food']
    // #swagger.description = 'Endpoint for fetching all foods.'
    Food.find((err, docs) => {
        if (!err) {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/Foods" },
                description: 'Foods Found.'
            } */
            res.send(docs);
        }
        else { console.log('Error in Retriving Foods:' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.getFood = (req, res) => {
    // #swagger.tags = ['Food']
    // #swagger.description = 'Endpoint for fetching particular food with food_id.'

    // #swagger.parameters['id'] = { description: 'Food ID' }
    Food.findOne({ food_id: req.params.id }, (err, doc) => {
        if (!doc) {
            /* #swagger.responses[404] = { 
                schema: { $ref: "#/definitions/FetchFood404ErrorResponse" },
                description: 'Food Not Found.' 
            } */
            res.status(404).send({
                "message": `Sorry, Food with Food ID: ${req.params.id} not found!`
            });
        }
        else if (!err) {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/Food" },
                description: 'Food Found.'
            } */
            res.send(doc);
        }
        else { console.log('Error in Retriving Food:' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.addFood = (req, res) => {
    // #swagger.tags = ['Food']
    // #swagger.description = 'Endpoint for adding a new food..'

    /* #swagger.parameters['food'] = {
            in: 'body',
            description: 'Food details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Food" }
    } */
    var fd = new Food({
        food_id: req.body.food_id,
        food_name: req.body.food_name,
        food_cost: req.body.food_cost,
        food_type: req.body.food_type
    });
    fd.save((err, doc) => {
        if (!err) {
            /* #swagger.responses[201] = { 
                schema: { $ref: "#/definitions/Food" },
                description: 'Food add successful.' 
            } */
            res.send(doc);
        }
        else { console.log('Error in Food Save: ' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.updateFood = (req, res) => {
    // #swagger.tags = ['Food']
    // #swagger.description = 'Endpoint for updating a food.'

    /* #swagger.parameters['food'] = {
            in: 'body',
            description: 'Food details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Food" }
    } */

    var fd = {
        food_id: req.body.food_id,
        food_name: req.body.food_name,
        food_cost: req.body.food_cost,
        food_type: req.body.food_type
    };
    Food.findOneAndUpdate({ food_id: req.params.id }, { $set: fd }, { new: true }, (err, doc) => {
        if (!doc) {
            /* #swagger.responses[404] = { 
                schema: { $ref: "#/definitions/FetchFood404ErrorResponse" },
                description: 'Food Not Found.' 
            } */
            res.status(404).send({
                "message": `Sorry, Food with Food ID: ${req.params.id} not found!`
            });
        }
        else if (!err) {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/UpdatedFood" },
                description: 'Food update successful.' 
            } */
            res.send(doc);
        }
        else { console.log('Error in Food Update :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.deleteFood = (req, res) => {
    // #swagger.tags = ['Food']
    // #swagger.description = 'Endpoint for deleting a food.'

    // #swagger.parameters['id'] = { description: 'Food ID' }

    Food.findOneAndRemove({ food_id: req.params.id }, (err, doc) => {
        if (!doc) {
            /* #swagger.responses[404] = { 
                schema: { $ref: "#/definitions/FetchFood404ErrorResponse" },
                description: 'Food Not Found.' 
            } */
            res.status(404).send({
                "message": `Sorry, Food with Food ID: ${req.params.id} not found!`
            });
        }
        else if (!err) {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/FoodDeletedSuccessMessage" },
                description: 'Food delete successful.' 
            } */
            res.send({
                "message": "Food deleted successfully!"
            });
        }
        else { console.log('Error in Food Delete :' + JSON.stringify(err, undefined, 2)); }
    });
}