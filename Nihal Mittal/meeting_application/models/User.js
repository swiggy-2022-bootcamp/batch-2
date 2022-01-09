const Sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define("User", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
	},
	userid: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
});

// User.sync();
module.exports = User;
