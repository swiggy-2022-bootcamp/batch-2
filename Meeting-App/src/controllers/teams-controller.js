const {
    createTeamService,
    viewTeamsService
} = require('../services/teams-service');

const createTeamController = async (req, res) => {
    const team = {
        teamName: req.body.teamName,
        description: req.body.description,
        createdBy: req.user.email,
        members: []
    }

    team.members.push(req.user.email);
    team.members = team.members.toString();

    try {
        const result = await createTeamService(team);
        return res.status(201).json({
            successMessage: `Team Created Successfully. Team ID: ${result.id}`
        });
    } catch (e) {
        return res.status(500).json({
            errorMessage: `Something went wrong. ${e.message}`,
        })
    }
}

const viewTeamsController = async (req, res) => {
    const email = req.user.email;

    try {
        const teams = await viewTeams(email);
        if(teams.length > 0) {
            return res.status(200).json({
                successMessage: 'Teams fetched successfully.',
                teams: teams
            });
        } else {
            return res.status(404).json({
                errorMessage: 'No Teams Found!!!'
            })
        }
    } catch (e) {
        return res.status(500).json({
            errorMessage: `Something went wrong. ${e.message}`
        })
    }
}

const addMemberToTeamController = async (req, res) => {

}

const removeMemberFromTeamController = async (req, res) => {

}

const leavingTeamController = async (req, res) => {

}

const addingTeamToMeetingController = async (req, res) => {

}

const viewTeams = async (email) => {
    try {
        const teams = await viewTeamsService(email);
        if(teams != null){
            return teams;
        }
        return null;
    } catch (e) {
        throw Error(e);
    } 

}

module.exports = {
    createTeamController,
    viewTeamsController,
    addMemberToTeamController,
    removeMemberFromTeamController,
    leavingTeamController,
    addingTeamToMeetingController
}