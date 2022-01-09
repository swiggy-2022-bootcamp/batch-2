const routes = require('express').Router();
const authenticateToken = require('../middleware/authenticate-token');
const {
    createMeetingController,
    viewMeetingsController,
    searchMeetingsController
} = require('../controllers/meetingsController');

routes.post('/', authenticateToken, (req, res) => {
    createMeetingController(req, res);
});

routes.get('/', authenticateToken, (req, res) => {
    viewMeetingsController(req, res);
});

// Search meeting based on ID
routes.get('/:meetingId', authenticateToken, (req, res) => {
    searchMeetingsController(req, res);
});

module.exports = routes;