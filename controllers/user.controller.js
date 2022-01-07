const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.registeruser = (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint for user registration.'

    /* #swagger.parameters['user-details'] = {
        in: 'body',
        description: 'User credentials for user register.',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/UserDtls" }
    } */
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phone = req.body.phone;
    user.address = req.body.address;
    //console.log(user);
    user.save((err, doc) => {
        if (!err) {
            /* #swagger.responses[201] = { 
                schema: { $ref: "#/definitions/RegisterSuccessResponse" },
                description: 'User registration successful.' 
            } */
            res.send(doc);
        }
        else {
            /* #swagger.responses[403] = { 
                schema: { $ref: "#/definitions/Register403ErrorResponse" },
                description: 'Registration Forbidden.' 
            } */
            if (err.code == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else
                return next(err);
        }

    });
}

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
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        /* #swagger.responses[401] = { 
            schema: { $ref: "#/definitions/Login401ErrorResponse" },
            description: 'Unauthorized.' 
        } */
        else return res.status(404).json(info);
    })(req, res);
}

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