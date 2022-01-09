const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URI;
db.users = require("./user.model.js")(mongoose);
db.foods = require("./food.model.js")(mongoose);

module.exports = db;
