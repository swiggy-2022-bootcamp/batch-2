require('dotenv').config({ path: __dirname + '/.env' });
const mysql2 = require('mysql2');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected Sequelize to Database');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
