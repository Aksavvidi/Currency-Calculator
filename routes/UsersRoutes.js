const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const authenticateToken = require('../authMiddleware');

// Protected route (requires authentication)
    // Create a new user
    router.post('/',  userController.createUser);
    //Update a use by username
    router.patch('/update/:username',  userController.updateUser);

    // Delete a user by username
    router.delete('/delete/:username',  userController.deleteUser);

//public routes
    // Get all users
    router.get('/',  userController.findAll);

    // Get a specific user by username
    router.get('/:username', userController.findOne);





module.exports = router;