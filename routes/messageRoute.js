const express = require('express');

const router = express.Router();

const Userauthentication = require('../middlewares/auth');

const messageController = require('../controllers/messageController')

router.post('/addMessage', Userauthentication.authentication, messageController.addMessage);

module.exports = router;