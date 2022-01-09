const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URI;
db.users = require("../models/user.model")(mongoose);
db.foods = require("../models/food.model")(mongoose);
db.port = process.env.PORT

module.exports = db;
