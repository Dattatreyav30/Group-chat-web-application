const Message = require('../models/messageModel');

const User = require('../models/userModel')

exports.addMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        await Message.create({
            userId: req.user.id,
            messages: message
        })
        res.status(200).json({ Message: 'message added succesfully' })
    } catch (err) {
        res.status(500).json({ Message: 'internal server error' })
    }
}

exports.getAllMessages = async (req, res, next) => {
    try {
        const messages = await Message.findAll();
        const userName = await User.findOne({ where: { id: req.user.id } })
        res.status(200).json({messages,userName});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error' })
    }
}