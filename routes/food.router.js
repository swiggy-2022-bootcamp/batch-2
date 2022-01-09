const express = require('express');
const router = express.Router();
const fd = require('../controllers/food.controller');
const jwtHelper = require('../util/jwtHelper');

router.get('/food', fd.getFoods);
router.get('/food/:id', fd.getFood);
router.post('/food', jwtHelper.verifyJwtToken, fd.addFood);
router.put('/food/:id', jwtHelper.verifyJwtToken, fd.updateFood);
router.delete('/food/:id', jwtHelper.verifyJwtToken, fd.deleteFood);

module.exports = router;