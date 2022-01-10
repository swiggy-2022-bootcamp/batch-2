const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Team = sequelize.define('Team', {
    teamName: {
        type: DataTypes.STRING(5000),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    members: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Team;