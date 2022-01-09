const {
    createTeamService,
    viewTeamsService,
    updateTeamMembersService
} = require('../services/teams-service');
const { getUserByIdController } = require('./users-controller');

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
    const teamId = req.params.teamId;
    const userId = req.params.userId;

    try {
        const team = await getTeamById(teamId, req.user.email);
        if(team.length > 0) {
            const user = await getUserById(userId);
            if(user != null) {

                const teamMembers = team[0].members.split(",");
                
                if(teamMembers.includes(user.email)){
                    return res.status(200).json({
                        errorMessage: `User is already a member of the Team`
                    })
                } else {
                    teamMembers.push(user.email);
                    const updatedTeamMembers = teamMembers.toString();
                    team[0].members = updatedTeamMembers;

                    await updateTeamMembers(team[0]);
                    return res.status(200).json({
                        successMessage: `User added to Team Successfully`
                    })
                }
            } else {
                return res.status(404).json({
                    errorMessage: `User Not Found!!!`
                })
            }
        } else {
            return res.status(404).json({
                errorMessage: `Team Not Found!!!`
            })
        }
    } catch (e) {
        return res.status(500).json({
            errorMessage: `Something went wrong. ${e.message}`
        })
    } 
}

const removeMemberFromTeamController = async (req, res) => {
    const teamId = req.params.teamId;
    const userId = req.params.userId;

    try {
        const team = await getTeamById(teamId, req.user.email);
        if(team.length > 0) {
            if(team[0].createdBy == req.user.email) {
                const user = await getUserById(userId);
                if(user != null) {
    
                    const teamMembers = team[0].members.split(",");
                    
                    if(teamMembers.includes(user.email)){
                        const updatedTeamMembers = teamMembers.filter((member) => {
                            return member != user.email
                        })
                        team[0].members = updatedTeamMembers.toString();
                        await updateTeamMembers(team[0]);
                        return res.status(200).json({
                            errorMessage: `User has been removed from the Team`
                        })
                    } else {
                        return res.status(200).json({
                            errorMessage: `User is not a part of the Team`
                        })
                    }
                } else {
                    return res.status(404).json({
                        errorMessage: `User Not Found!!!`
                    })
                }
            } else {
                return res.status(401).json({
                    errorMessage: `You don't have authority to remove a member from the Team`
                })
            }
        } else {
            return res.status(404).json({
                errorMessage: `Team Not Found!!!`
            })
        }
    } catch (e) {
        return res.status(500).json({
            errorMessage: `Something went wrong. ${e.message}`
        })
    }
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

const getTeamById = async (teamId, email) => {
    try {
        const teams = await viewTeams(email);
        if(teams != null){
            const team = teams.filter((team) => {
                return team.id == teamId
            })
            return team;
        } else {
            return null;
        }
    } catch (e) {
        throw Error(e);
    } 
}

const getUserById = async (userId) => {
    try {
        const user = await getUserByIdController(userId);
        return user;
    } catch (e) {
        throw Error(e);
    }
}

const updateTeamMembers = async (team) => {
    try {
        await updateTeamMembersService(team);
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