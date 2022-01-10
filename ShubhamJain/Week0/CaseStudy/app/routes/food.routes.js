const logger = require('../config/winston');

module.exports = app => {
    const foods = require('../controllers/food.controller');
    var router = require('express').Router();


    logger.info("inside food routes");
    router.get('/food', foods.findAllFoods);
    router.get('/food/:id', foods.findFoodItemById);
    router.post('/food', foods.createFoodItem);
    router.delete('/food/:id', foods.deleteFoodItemById);
    router.put('/food', foods.updateFoodItemById);
    
    app.use('/api', router);
}