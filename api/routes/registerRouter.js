const express = require('express');
const router = express.Router();

const validatInput = require('../middleware/registerValidator');
const checkExistence = require('../middleware/userExistence');
const passConfirm = require('../middleware/passwordConfirmation');

const userController = require('../controllers/userController');

router.post('/',
    validatInput,   
    checkExistence,
    passConfirm,
    userController.addUser
);

module.exports = router;