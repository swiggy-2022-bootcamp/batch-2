module.exports = app => {
    const foods = require('../controllers/food.controller');
    var router = require('express').Router();

    router.get('/food', foods.findAllFoods);
    app.use('/api', router);
}