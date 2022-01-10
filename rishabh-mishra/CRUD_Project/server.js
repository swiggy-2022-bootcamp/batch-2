require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const serverConfig = require("./app/config/server.config");
const Routes = require("./app/routes/index");
const db = require("./app/models");

// Config
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("cannot connect to db", err);
    process.exit();
  });

// Test Route
app.get("/test", (req, res) => {
  res.json({ message: "welcome to NodeJS App" });
});

// Config Routes
const routes = new Routes(app);
routes.configRoutes();

const PORT = serverConfig.port;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
