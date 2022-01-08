const dbConfig = require("../config/db.config")
var logger = require('../config/winston');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.foods = require("./food.model.js")(mongoose);

module.exports = db;
