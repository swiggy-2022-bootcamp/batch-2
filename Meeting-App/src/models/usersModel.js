const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConn');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(5000),
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = User;