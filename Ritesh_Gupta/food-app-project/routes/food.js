const express = require('express');
const foodController = require('../controller/food.controller');
const router = express.Router();


router.post('/addFood', foodController.insertFoodDetails);

router.get('/:foodid', foodController.getFoodById);



module.exports = router;