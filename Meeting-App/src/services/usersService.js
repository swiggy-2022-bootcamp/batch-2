const User = require('../models/usersModel');

const createUserService = async (user) => {

    // Create the 'users' table in DB if it doesn't already exists
    await User.sync();

    try {
        const result = await User.create(user);
        return result;
    } catch (e) {
        throw Error(e.message);
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
        throw Error(e.message);
    }
}

const getUserByIdService = async (id) => {

    await User.sync();

    try {
        const user = await User.findOne({
            where: {
                id: id
            },
            raw: true
        });
        return user;
    } catch (e) {
        throw Error(e.message);
    }
}

module.exports = {
    createUserService,
    getUserByEmailService,
    getUserByIdService
};