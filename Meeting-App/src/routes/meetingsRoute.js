const routes = require('express').Router();
const authenticateToken = require('../middleware/authenticate-token');
const {
    createMeetingController,
} = require('../controllers/meetingsController');

routes.post('/', authenticateToken, (req, res) => {
    createMeetingController(req, res);
});

module.exports = routes;