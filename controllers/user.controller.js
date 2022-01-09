const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

/**
 * This function helps to validate user details before registration.
 * 
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 */
module.exports.validateUser = (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, us1) => {
        if (us1) {
            /* #swagger.responses[409] = { 
                schema: { $ref: "#/definitions/Register409UsernameErrorResponse" },
                description: 'Registration Forbidden.' 
            } */
            return res.status(409).send({ "message": 'Username already registered!' });
        }
        else {
            User.findOne({ email: req.body.email }, (err, us2) => {
                if (us2) {
                    /* #swagger.responses[409] = { 
                        schema: { $ref: "#/definitions/Register409EmailErrorResponse" },
                        description: 'Registration Forbidden.' 
                    } */
                    return res.status(409).send({ "message": 'Email already registered!' });
                }
                else {
                    User.findOne({ phone: req.body.phone }, (err, us3) => {
                        if (us3) {
                            /* #swagger.responses[409] = { 
                                schema: { $ref: "#/definitions/Register409PhoneNumberErrorResponse" },
                                description: 'Registration Forbidden.' 
                            } */
                            return res.status(409).send({ "message": 'Phone number already registered!' });
                        }
                        next();
                    });
                }
            });
        }
    });
}

/**
 * This function helps to register a new user.
 * 
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 */
module.exports.registeruser = (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint for user registration.'

    /* #swagger.parameters['user-details'] = {
        in: 'body',
        description: 'User credentials for user registration.',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/User" }
    } */

    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address
    });
    //console.log(user);
    user.save((err, doc) => {
        if (!err) {
            /* #swagger.responses[201] = { 
                schema: { $ref: "#/definitions/RegisterSuccessResponse" },
                description: 'User registration successful.' 
            } */
            res.status(201).send({
                "message": "User Registered Successfully!",
                "user": doc
            });
        }
        else {
            return next(err);
        }
    });
}

/**
 * This function helps to authenticate an user and generate token.
 * 
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 */
module.exports.authenticateuser = (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint for user login.'

    /* #swagger.parameters['login-details'] = {
        in: 'body',
        description: 'User credentials for user login.',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/UserAuthDtls" }
    } */
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(400).json(err);
        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/LoginSuccessResponse" },
            description: 'Login successful.' 
        } */
        else if (user) return res.status(200).json({
            "message": "User logged in successfully!",
            "token": user.generateJwt()
        });
        /* #swagger.responses[401] = { 
            schema: { $ref: "#/definitions/Login401ErrorResponse" },
            description: 'Unauthorized.' 
        } */
        else return res.status(401).json(info);
    })(req, res);
}

/**
 * This function helps to fetch an user profile.
 * 
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 */
module.exports.usrProfile = (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint for fetching user profile.'
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user) {
                /* #swagger.responses[404] = { 
                    schema: { $ref: "#/definitions/FetchUser404ErrorResponse" },
                    description: 'User Not Found.' 
                } */
                return res.status(404).json({ status: false, message: 'User record not found.' });
            }
            else {
                /* #swagger.responses[200] = { 
                    schema: { $ref: "#/definitions/UserProfile" },
                    description: 'Fetch User Profile successful.'
                } */
                let usr = _.pick(user, ['username', 'email', 'phone']);
                let add = _.pick(user.address, ['house_no', 'street', 'city', 'state', 'zip']);
                usr['address'] = add;
                return res.status(200).json({
                    status: true,
                    user: usr
                });
            }
        }
    );
}

/**
 * This function helps to fetch all users.
 * 
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 */
module.exports.getUsers = (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint for fetching all users.'
    User.find((err, docs) => {
        if (!err) {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/Users" },
                description: 'Users Found.'
            } */
            res.send(docs);
        }
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
}

/**
 * This function helps to fetch an user by User ID.
 * 
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 */
module.exports.getUser = (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint for fetching particular user with id.'

    // #swagger.parameters['id'] = { description: 'User ID' }

    User.findOne({ id: req.params.id }, (err, doc) => {
        if (!doc) {
            /* #swagger.responses[404] = { 
                schema: { $ref: "#/definitions/FetchUser404ErrorResponse" },
                description: 'User Not Found.' 
            } */
            res.status(404).send({
                "message": `Sorry, user with id: ${req.params.id} not found!`
            });
        }
        else if (!err) {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/User" },
                description: 'User Found.'
            } */
            res.send(doc);
        }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
}

/**
 * This function helps to update details of an User.
 * 
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 */
module.exports.updateUser = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint for updating an user.'

    /* #swagger.parameters['user-details'] = {
            in: 'body',
            description: 'User details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/UpdateUser" }
    } */

    //Check if user wants to change username and hence restrict
    let currUser = await User.findOne({ _id: req._id }).exec();
    if (!(currUser.username === req.body.username)) {
        /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/ChangeUsername409ErrorResponse" },
            description: 'Username cannot be changed.'
        } */
        return res.status(409).send({
            "message": "Username can't be changed!"
        });
    }

    var user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address
    };
    User.findOneAndUpdate({ _id: req._id }, { $set: user }, { new: true }, (err, doc) => {
        if (!err) {
            /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/UpdatedUser" },
                description: 'User update successful.' 
            } */
            res.send(doc);
        }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
}

/**
 * This function helps to delete an user by User ID.
 * 
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 */
module.exports.deleteUser = (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint for deleting an user.'

    // #swagger.parameters['id'] = { description: 'User ID' }
    User.findOneAndRemove({ id: req.params.id }, (err, doc) => {
        if (!doc) {
            /* #swagger.responses[404] = { 
                schema: { $ref: "#/definitions/FetchUser404ErrorResponse" },
                description: 'User Not Found.' 
            } */
            res.status(404).send({
                "message": `Sorry, user with id: ${req.params.id} not found!`
            });
        }
        else if (!err) {
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/UserDeletedSuccessMessage" },
                description: 'User delete successful.' 
            } */
            res.send({
                "message": "User deleted successfully!"
            });
        }
        else { console.log('Error in User Delete:' + JSON.stringify(err, undefined, 2)); }
    });
}