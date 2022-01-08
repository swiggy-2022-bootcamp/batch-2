const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("User", {
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
