// config/db.js
const Sequelize = require("sequelize");

const db = new Sequelize({
	dialect: "sqlite",
	storage: process.env.DB_NAME,
	logging: false,
});

module.exports = db;
