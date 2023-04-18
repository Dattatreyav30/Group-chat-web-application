const jwt = require('jsonwebtoken');

const User = require('../models/userModel')

require('dotenv').config();


const authentication = async (req, res, next) => {
    try {
        const token = req.header('authorization');
        const secretkey = process.env.JWT_SECRET_KEY;
        const compare = jwt.verify(token, secretkey);
        const user = await User.findByPk(compare.userId);
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}


module.exports = {
    authentication
}