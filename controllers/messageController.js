const Message = require('../models/messageModel');

const User = require('../models/userModel');
const { Op } = require('sequelize');

exports.addMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        await Message.create({
            userId: req.user.id,
            name : req.user.name,
            messages: message
        })
        res.status(200).json({ Message: 'message added succesfully' })
    } catch (err) {
        res.status(500).json({ Message: 'internal server error' })
    }
}
exports.getAllMessages = async (req, res, next) => {
    try {
        let messages;
        if (!req.query.lastMessageDate) {
            messages = await Message.findAll({ order: [['createdAt', 'ASC']] });
        } else {
            messages = await Message.findAll({ where: { createdAt: { [Op.gt]: req.query.lastMessageDate } } });
        }
        res.status(200).json({ messages});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error' })
    }
}
