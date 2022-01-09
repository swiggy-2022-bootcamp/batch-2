const routes = require('express').Router();
const authenticateToken = require('../middleware/authenticate-token');
const {
    createMeetingController,
    viewMeetingsController
} = require('../controllers/meetingsController');

routes.post('/', authenticateToken, (req, res) => {
    createMeetingController(req, res);
});

routes.get('/', authenticateToken, (req, res) => {
    viewMeetingsController(req, res);
});

module.exports = routes;