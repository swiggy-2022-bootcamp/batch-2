const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConn');

const Meeting = sequelize.define('Meeting', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    end: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    attendees: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Meeting;