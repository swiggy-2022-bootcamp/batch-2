const express = require('express');
const foodController = require('../controller/food.controller');
const router = express.Router();

router.get('/', foodController.getAllFood);

router.post('/addFood', foodController.insertFoodDetails);

router.get('/:foodid', foodController.getFoodById);

router.get('/foodType/:foodType', foodController.getFoodByType);



module.exports = router;