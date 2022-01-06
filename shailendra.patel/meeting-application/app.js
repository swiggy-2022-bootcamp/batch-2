const express = require('express')
const app = express()
const port = 3000

//include middleware
const bodyParser = require("body-parser");

//include my routes
const authRoutes = require("./route/authRoute");


//use the middleware
app.use(bodyParser.json());

//use my routes
app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
