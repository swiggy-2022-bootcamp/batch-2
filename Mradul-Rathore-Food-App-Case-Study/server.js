require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();

var corsOptions = {
    origin: "*"
}

// for env variables
app.use(cors(corsOptions));
app.use(express.json())

const db = require("./app/models")
const dbURL = process.env.MONGO_URI
const PORT = process.env.PORT

//connect with mongodb
db.mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to db");
}).catch(err => {
    console.log("cannot connect to db", err)
    process.exit()
})

require("./app/routes/routes")(app);

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});