const Message = require('../models/messageModel');

const jwt = require('jsonwebtoken')

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

