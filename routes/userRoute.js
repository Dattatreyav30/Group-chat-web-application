const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController')

router.post('/signup', userController.postAdduser);

router.post('/login', userController.addUserlogin)

module.exports = router;