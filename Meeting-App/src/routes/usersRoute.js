const routes = require('express').Router();

const { createUserController } = require('../controllers/usersController');

routes.post('/register', async (req, res) => {
    createUserController(req, res);
});

module.exports = routes;