const express = require('express');
const catchErrors = require('../handlers/errorHandlers').catchErrors;
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();



router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Google Login Backend is up and running'
    })
});

router.post('/tokensignin', catchErrors(authController.authenticateUser), userController.login);

module.exports = router;