const Sequelize = require("sequelize");
const db = require("../db");

const Meeting = db.define("Meeting", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	date_of_meeting: {
		type: Sequelize.DATEONLY,
	},
	start_time: {
		type: Sequelize.STRING,
	},
	end_time: {
		type: Sequelize.STRING,
	},
	description: {
		type: Sequelize.STRING,
	},
	email_ids_of_attendees: {
		type: Sequelize.STRING,
	},
});

module.exports = Meeting;
