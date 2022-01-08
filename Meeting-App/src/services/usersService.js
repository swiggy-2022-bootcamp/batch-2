const User = require('../models/usersModel');

const createUserService = async (user) => {

    // Create the 'users' table in DB if it doesn't already exists
    await User.sync();

    try {
        const result = await User.create(user);
        return result;
    } catch (e) {
        throw Error('Unable to create a User');
    } 
}

const getUserByEmailService = async (email) => {

    await User.sync();

    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        return user;
    } catch (e) {
        throw Error('Unable to get a User')
    }
}

module.exports = {
    createUserService,
    getUserByEmailService
};