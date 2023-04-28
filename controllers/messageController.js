const Message = require('../models/messageModel');
const { Op } = require('sequelize');

const { cronJob } = require('cron')

exports.addMessage = async (req, res, next) => {
    try {
        const groupId = req.header('groupId');
        const { message } = req.body;
        await Message.create({
            userId: req.user.id,
            name: req.user.name,
            messages: message,
            groupId: groupId
        })
        res.status(200).json({ Message: 'message added succesfully' })
    } catch (err) {
        res.status(500).json({ Message: 'internal server error' })
    }
}
exports.getAllMessages = async (req, res, next) => {
    try {
        const groupId = req.header('groupId')
        let messages;
        if (!req.query.lastMessageDate) {
            messages = await Message.findAll({
                where: { groupId: groupId },
                order: [['createdAt', 'ASC']]
            });
        } else {
            messages = await Message.findAll({
                where: {
                    createdAt: { [Op.gt]: req.query.lastMessageDate },
                    groupId: groupId
                }
            });
        }
        res.status(200).json({ messages });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error' })
    }
}

const job = new cronJob('0 0 * * *', async () => {
    const today = new Date();
    await Message.destroy({
        where: {
            createdAt: {
                [Op.lt]: today
            }
        }
    })
})

job.start();
job.stop();