const express = require('express');
const router = express.Router();
const fd = require('../controllers/food.controller');

router.get('/food', fd.getFoods);
router.get('/food/:id', fd.getFood);
router.post('/food', fd.addFood);
router.put('/food/:id', fd.updateFood);
router.delete('/food/:id', fd.deleteFood);

module.exports = router;