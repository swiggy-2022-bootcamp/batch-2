// config/db.js
const Sequelize = require("sequelize");

const db = new Sequelize({
	dialect: "sqlite",
	storage: "db.sqlite3",
	logging: false,
});

module.exports = db;
