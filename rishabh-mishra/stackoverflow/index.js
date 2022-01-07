require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const config = require("./config");
const Routes = require("./routes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = config.server.port;
new Routes(app).configRoutes();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
