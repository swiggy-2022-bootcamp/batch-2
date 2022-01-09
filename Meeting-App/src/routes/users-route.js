const routes = require('express').Router();
const authenticateToken = require('../middleware/authenticate-token');

const { 
    createUserController,
    loginUserController
} = require('../controllers/users-controller');

routes.post('/register', (req, res) => {
    createUserController(req, res);
});

routes.post('/login', (req, res) => {
    loginUserController(req, res);
});

module.exports = routes;