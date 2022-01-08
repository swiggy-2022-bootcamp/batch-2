const UserInfraModel = require('../infrastructure/models/User');
const log4js = require('log4js');

module.exports = {
    doesEmailAlreadyExists = (email) => {
        return UserInfraModel.find({email_address: email}, (err, docs) => {
            if (!err) {
                
            }
        });
        return false;
    }
}