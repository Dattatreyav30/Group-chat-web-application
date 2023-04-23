const express = require('express'); 

const router = express.Router();

const userAuth = require('../middlewares/auth');

const groupController = require('../controllers/groupcontroller')

router.get('/getUsers',userAuth.authentication,groupController.getUsers);

router.post('/postGroupUser',userAuth.authentication,groupController.postGroupUsers);

router.get('/getGroups',userAuth.authentication,groupController.getGroups)

module.exports = router;