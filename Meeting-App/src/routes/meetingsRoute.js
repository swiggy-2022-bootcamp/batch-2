const routes = require('express').Router();
const authenticateToken = require('../middleware/authenticate-token');
const {
    createMeetingController,
    viewMeetingsController,
    searchMeetingsController,
    leaveMeetingsController
} = require('../controllers/meetingsController');

routes.post('/', authenticateToken, (req, res) => {
    createMeetingController(req, res);
});

routes.get('/', authenticateToken, (req, res) => {
    viewMeetingsController(req, res);
});

routes.get('/date/:time', authenticateToken, (req, res) => {
    viewMeetingsController(req, res);
    
});

// Search Meeting by Title or Desc
routes.get('/search', authenticateToken, (req, res) => {
    searchMeetingsController(req, res);
});

// Search meeting based on ID
routes.get('/:meetingId', authenticateToken, (req, res) => {
    searchMeetingsController(req, res);
});

routes.put('/:meetingId', authenticateToken, (req, res) => {
    leaveMeetingsController(req, res);
});

module.exports = routes;