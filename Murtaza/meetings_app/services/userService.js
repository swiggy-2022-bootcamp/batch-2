const UserModel = require('../models/User');

const createUserIfNotExists = async userDomainEntity => {

    let alreadyExistingUserWithIncomingEmailAddress = await UserModel.find({emailAddress: userDomainEntity.emailAddress});
    let alreadyExistingUserWithIncomingUsername = await UserModel.find({username: userDomainEntity.username});

    
    if (alreadyExistingUserWithIncomingEmailAddress.length > 0)
        return {data: userDomainEntity.emailAddress, message: "Email Address already Exists"};

    if (alreadyExistingUserWithIncomingUsername.length > 0) 
        return {data: userDomainEntity.emailAddress, message: "Username already taken"};

    const user = new UserModel();
    user.firstName = userDomainEntity.firstName;
    user.lastName = userDomainEntity.lastName;
    user.emailAddress = userDomainEntity.emailAddress;
    user.username = userDomainEntity.username;
    user.setPassword(userDomainEntity.password);
    user.bio = userDomainEntity.bio;

    return await user.save().then(function(){
        return {data: user.toJSON(), cookie: user.generateJWT(), message: "User created succesfully"};
    }).catch(err => {
        throw err;
    });  
}

const authenticateUser = async (username, password) => {
    const user = await findUserByUsername(username);
    if (user.isPasswordValid(password)) {
        return {isLoggedin: true, cookie: user.generateJWT(), message: "User logged in succesfully"};
    } else {
        return {isLoggedin: false, message: "Invalid Credentials, please try again"};
    }
}

const findUserByUsername = async (username) => {
    return await UserModel.findOne({username: username});
} 

const findUserByUserId = async (userId) => {
    let result;
    await UserModel.findOne({id: userId}, {hash: 0, salt: 0}).then(user => {
        result = {data: user, message: "User fetched succesfully"};
    }).catch(err => result = {message: `No user details found for user id: ${userId}`});

    return result;
}

const findUserByEmailAddress = async (emailAddress) => {
    return await UserModel.findOne({emailAddress: emailAddress});
}

module.exports = {
    createUserIfNotExists: createUserIfNotExists,
    authenticateUser: authenticateUser,
    findUserByUserId: findUserByUserId,
    findUserByEmailAddress: findUserByEmailAddress
}
