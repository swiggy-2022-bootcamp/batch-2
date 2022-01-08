module.exports = app => {
    const foods = require('../controllers/food.controller');
    var router = require('express').Router();

    router.get('/food', foods.findAllFoods);
    router.post('/food', foods.createFoodItem);
    app.use('/api', router);
}