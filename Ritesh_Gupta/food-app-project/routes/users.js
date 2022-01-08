const express = require('express');
const usersController = require('../controller/users.controller');



const router = express.Router();


// get all users
router.get('/', usersController.getAllUsers);


// get user by id
router.get('/:userid', usersController.getUserById);

// update user
router.put('/update', usersController.updateUser);

// delete user by id
router.delete('/:userid', usersController.deleteUserById)


module.exports = router;


