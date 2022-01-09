const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { 
    createUserService,
    getUserByEmailService
} = require('../services/usersService');

const createUserController = async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    // If user already exists with the same email, then throw an error
    const userData = await getUserByEmailController(user.email);

    if(userData === null){
        
        // Encrypting Password before sending it to DB
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt(user.password, salt);
            user.password = hashedPassword;
        } catch (e) {
            return res.status(500).json({
                errorMessage: `Something went wrong. ${e.message}`,
            });
        }

        try {
            const result = await createUserService(user);
            return res.status(201).json({
                successMessage: `User Created Successfully. User ID: ${result.id}`
            });
        } catch (e) {
            return res.status(400).json({
                errorMessage: `Something went wrong. ${e.message}`,
            })
        }
    } else {
        return res.status(400).json({
            errorMessage: `User with email as ${user.email} already exists.`
        });
    }   
}

const loginUserController = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    const userData = await getUserByEmailController(user.email);

    if(userData != null){
        const isPasswordCorrect = await bcrypt.compare(user.password, userData.password);
        if(isPasswordCorrect){
            const userSign = {
                id: userData.id,
                email: userData.email,
                name: userData.name
            }
            const accessToken = jwt.sign(userSign, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            return res.json({
                successMessage: 'Logged in successfully',
                accessToken
            });
        } else {
            return res.json({
                errorMessage: `Incorrect Password.`
            });
        }
    } else {
        return res.json({
            errorMessage: `User with email as ${user.email} doesn't exists.`
        });
    }
}

const getUserByEmailController = async (email) => {
    const user = await getUserByEmailService(email);

    if(user != null){
        return user;
    }

    return null;
}

module.exports = {
    createUserController,
    loginUserController
}