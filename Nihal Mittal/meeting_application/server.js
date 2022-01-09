require("dotenv").config();
const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/meeting"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Meeting Application listening at http://localhost:${port}`);
});
