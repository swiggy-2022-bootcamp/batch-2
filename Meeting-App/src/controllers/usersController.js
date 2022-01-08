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

    const userFound = await getUserByEmailController(user.email);

    if(userFound === false){
        try {
            const result = await createUserService(user);
            return res.status(200).json({
                successMessage: `User Created Successfully. User ID: ${result.id}`
            });
        } catch (e) {
            return res.status(400).json({
                errorMessage: `Something went wrong. ${e.message}`,
            })
        }
    } else {
        return res.status(200).json({
            errorMessage: `User with email as ${user.email} already exists.`
        });
    }   
}

const getUserByEmailController = async (email) => {
    const user = await getUserByEmailService(email);

    if(user === null){
        return false;
    }

    return true;
}

module.exports = {
    createUserController
}