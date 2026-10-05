const express = require('express');
const router = express.Router();

// Import the user controller
const userController = require('../Controllers/UserController');

// Define the routes
router.post('/createusers', userController.createUser);
router.post('/userlogin', userController.loginUser);

//export the router to be used in the other files
module.exports = router;


