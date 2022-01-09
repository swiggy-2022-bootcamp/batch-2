const Team = require('../models/teams-model');
const Op = require('sequelize').Op;

const createTeamService = async (team) => {
    await Team.sync();

    try {
        const result = await Team.create(team);
        return result;
    } catch (e) {
        throw Error(e.message);
    }
}

const viewTeamsService = async (email) => {
    await Team.sync();

    try {
        const result = await Team.findAll({
            where: {
                members: {
                    [Op.like]: `%${email}%`
                }
            },
            raw: true
        });
        return result;
    } catch (e) {
        throw Error(e.message);
    }
}

module.exports = {
    createTeamService,
    viewTeamsService
}