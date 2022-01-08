const routes = require('express').Router();
const authenticateToken = require('../middleware/authenticate-token');

const { 
    createUserController,
    loginUserController
} = require('../controllers/usersController');

routes.post('/register', (req, res) => {
    createUserController(req, res);
});

routes.post('/login', (req, res) => {
    loginUserController(req, res);
});

routes.get('/testRoute', authenticateToken, (req, res) => {
    res.json({
        message: 'Test Protected Route',
        user: req.user
    });
});

module.exports = routes;