const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");

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

app.use(express.json());

app.use(require("./routes/auth"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Meeting Application listening at http://localhost:${port}`);
});
