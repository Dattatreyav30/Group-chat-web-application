const User = require('../models/userModel');

const bcrypt = require('bcrypt');

const { Op } = require('sequelize');

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