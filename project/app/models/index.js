const dbconfig = require("../config/db.config.js")
const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose;
db.url = dbconfig.url
db.users = require("../models/user.models.js")(mongoose)
db.food = require("../models/food.model.js")(mongoose)

module.exports = db;