const routes = require('express').Router();
const authenticateToken = require('../middleware/authenticate-token');

const {
    createTeamController,
    addMemberToTeamController,
    removeMemberFromTeamController,
    leavingTeamController,
    addingTeamToMeetingController
} = require('../controllers/teams-controller');

// Creating a Team
routes.post('/', authenticateToken, (req, res) => {
    createTeamController(req, res);
});

// Adding a member to Team
routes.put('/:teamId/user/:userId', authenticateToken, (req, res) => {
    addMemberToTeamController(req, res);
});

// Remove a member from the Team
routes.delete('/:teamId/user/:userId', authenticateToken, (req, res) => {
    removeMemberFromTeamController(req, res);
});

// Leaving a team
routes.put('/:teamId', authenticateToken, (req, res) => {
    leavingTeamController(req, res);
});

// Adding a team to meeting
routes.put('/:teamId/meeting/:meetingId', authenticateToken, (req, res) => {
    addingTeamToMeetingController(req, res);
});

module.exports = routes;