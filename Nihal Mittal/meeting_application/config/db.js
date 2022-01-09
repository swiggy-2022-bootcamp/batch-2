const Sequelize = require("sequelize");

const db = new Sequelize({
	dialect: "sqlite",
	storage: process.env.DB_NAME,
	logging: false,
});

// start db
const connectDB = async () => {
	try {
		await db.authenticate();
		await db.sync();
		console.log("Database connected");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
connectDB();

module.exports = db;
