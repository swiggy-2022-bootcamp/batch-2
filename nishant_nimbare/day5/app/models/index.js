const mongooose = require("mongoose");

const dbConfig = require("../config/db.config");

mongooose.Promise = global.Promise;

const db = {
    mongooose : mongooose,
    url : dbConfig.url,
};

db.users = require("./user.model")(mongooose);

module.exports = db;