module.exports = app => {
    const foods = require('../controllers/food.controller');
    var router = require('express').Router();

    router.get('/food', foods.findAllFoods);
    router.get('/food/:id', foods.findFoodItemById);
    router.post('/food', foods.createFoodItem);
    router.delete('/food/:id', foods.deleteFoodItemById);

    app.use('/api', router);
}