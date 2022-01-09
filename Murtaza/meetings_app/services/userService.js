const UserModel = require("../models/User");
const createError = require("http-errors");

const createUserIfNotExists = async (userDomainEntity) => {
	try {
		let alreadyExistingUserWithIncomingEmailAddress = await UserModel.find({ emailAddress: userDomainEntity.emailAddress });
		let alreadyExistingUserWithIncomingUsername = await UserModel.find({ username: userDomainEntity.username });

		if (alreadyExistingUserWithIncomingEmailAddress.length > 0)
			return { data: userDomainEntity.emailAddress, message: "Email Address already Exists" };

		if (alreadyExistingUserWithIncomingUsername.length > 0)
			return { data: userDomainEntity.emailAddress, message: "Username already taken" };

		const user = new UserModel();
		user.firstName = userDomainEntity.firstName;
		user.lastName = userDomainEntity.lastName;
		user.emailAddress = userDomainEntity.emailAddress;
		user.username = userDomainEntity.username;
		user.setPassword(userDomainEntity.password);
		user.bio = userDomainEntity.bio;

		return await user.save().then(function () {
			return {
				data: user.toJSON(),
				cookie: user.generateJWT(),
				message: "User created succesfully",
			};
		}).catch((err) => {
			throw err;
		});
	} catch (err) {
		console.log(err);
		throw createError(500, `Failed to create user`);
	}
};

const authenticateUser = async (username, password) => {
	const user = await findUserByUsername(username);
	if (user.isPasswordValid(password)) {
		return {
			cookie: user.generateJWT(),
			message: "User logged in succesfully",
		};
	} else {
		throw createError(403, "Invalid Credentials");
	}
};

const findUserByUsername = async (username) => {
	return UserModel.findOne({ username: username })
		.then(result => result)
		.catch(err => {
			console.log(err);
			throw createError(404, `No user exists with user name: ${username}`);
		});
};

const findUserByUserId = (userId) => {
	return UserModel.findOne({ id: userId }, { hash: 0, salt: 0 })
		.then((user) => {
			return { data: user, message: "User fetched succesfully" };
		})
		.catch((err) => {
			console.log(err);
			throw createError(404, `No user details found for user id: ${userId}`);
		});
};

const findUserByEmailAddress = async (emailAddress) => {
	try {
		return await UserModel.findOne({ emailAddress: emailAddress });
	} catch (err) {
		console.log(err);
		throw createError(404, `No user found with email address: ${emailAddress}`);
	}
};

module.exports = {
	createUserIfNotExists: createUserIfNotExists,
	authenticateUser: authenticateUser,
	findUserByUserId: findUserByUserId,
	findUserByEmailAddress: findUserByEmailAddress,
};
