const express = require('express');

const router = express.Router();

const userAuth = require('../middlewares/auth');

const groupController = require('../controllers/groupcontroller')

router.get('/getUsers', userAuth.authentication, groupController.getUsers);

router.post('/postGroupUser', userAuth.authentication, groupController.postGroupUsers);

router.get('/getGroups', userAuth.authentication, groupController.getGroups);

router.get('/getGroupUsers', groupController.getGroupUsers);

router.post('/removeUser', userAuth.authentication, groupController.removeUser);

router.post('/makeAdmin', userAuth.authentication, groupController.makeAdmin);

router.get('/newusers', userAuth.authentication, groupController.newusers);

router.post('/addnewuser',userAuth.authentication,groupController.addnewuser)

module.exports = router;