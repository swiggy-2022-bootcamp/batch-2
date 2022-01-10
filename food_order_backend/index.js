const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const { render } = require("ejs");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
//sapp.use('/', express.static(path.join(__dirname, 'static/index')));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


app.listen(8000, () => {
	console.log('Server up at 8000')
})