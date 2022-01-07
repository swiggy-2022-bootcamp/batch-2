module.exports = app => {
    const users = require('../controllers/userController');
    let router = require('express').Router();

    router.post('/register', users.createUser);
    router.get('/', users.findAllUsers);
    router.get('/:id', users.findUserById);
    router.put('/:id', users.updateUserById);
    router.delete('/:id', users.deleteUserById);

    app.use('/users', router);
}