const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Meeting = sequelize.define('Meeting', {
    title: {
        type: DataTypes.STRING(5000),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attendees: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Meeting;