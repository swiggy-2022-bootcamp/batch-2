const express = require('express');
const router = express.Router();
const fd = require('../controllers/food.controller');
const jwtHelper = require('../util/jwtHelper');

/* Route to fetch all foods. */
router.get('/food', fd.getFoods);

/* Route to fetch a food by Food ID. */
router.get('/food/:id', fd.getFood);

/* Route to add a food. */
router.post('/food', jwtHelper.verifyJwtToken, fd.addFood);

/* Route to update a food. */
router.put('/food/:id', jwtHelper.verifyJwtToken, fd.updateFood);

/* Route to delete a food. */
router.delete('/food/:id', jwtHelper.verifyJwtToken, fd.deleteFood);

module.exports = router;