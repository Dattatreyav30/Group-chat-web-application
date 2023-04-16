const User = require('../models/userModel');

const bcrypt = require('bcrypt');

const { Op } = require('sequelize');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const crypto = require('crypto');

// const secretkey =  crypto.randomBytes(32).toString('hex');
// console.log(secretkey)

const jwtSecretkey = process.env.JWT_SECRET_KEY;

function generateAccessToken(id) {
    return jwt.sign({ userId: id }, jwtSecretkey)
}

exports.postAdduser = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: email }, { phone: phone }]
            }
        })
        if (user) {
            return res.status(200).json({ message: 'user already exists' })
        }
        const hash = await bcrypt.hash(password, 5,)
        await User.create({
            name: name,
            email: email,
            phone: phone,
            password: hash
        });

        res.status(200).json({ message: 'user signed up successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error occured while signing up' })
    }

}

exports.addUserlogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.Password;
        const user = await User.findOne({
            where: { email: email }
        })
        if (!user) {
            return res.status(404).json({ message: 'user doesnt exist' })
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.status(200).json({ message: 'user logged in succesfully', token: generateAccessToken(user.id), user })
        } else {
            return res.status(401).json({ message: 'Incorrect password' })
        }
    } catch (err) {
        res.status(500).json({ message: 'internal server error' })
    }
}