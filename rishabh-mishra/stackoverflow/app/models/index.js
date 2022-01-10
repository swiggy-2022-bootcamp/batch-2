const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.questions = require("./question.model.js")(mongoose);
db.answers = require("./answer.model.js")(mongoose);

module.exports = db;
