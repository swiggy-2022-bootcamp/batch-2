const bcrypt = require('bcrypt');
const { saltRounds } = require("../config/server.config");
const { makeErr } = require('./error.utils');

exports.encrypt = input => {
    return new Promise((resolve, reject) => {

        bcrypt.hash(input, saltRounds, function (err, hash) {
            if (err) {
                console.log(err);
                reject(makeErr("Something went wrong"));
            }
            resolve(hash);
        });

    });
}

exports.comparehash = (input, hash) => {
    return new Promise((resolve, reject) => {

        bcrypt.compare(input, hash, function (err, result) {
            if (err) {
                console.log(err);
                reject(makeErr("Something went wrong"));
            }
            resolve(result);
        });

    });

}