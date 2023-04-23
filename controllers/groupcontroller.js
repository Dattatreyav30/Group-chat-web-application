const User = require('../models/userModel');

const { Op } = require('sequelize');

const Group = require('../models/groupModel');

const UserGroup = require('../models/userGroup');

const { v4: uuidv4 } = require('uuid');
const userGroup = require('../models/userGroup');

exports.getUsers = async (req, res, next) => {
    try {
        const userId = req.user.id
        const users = await User.findAll({ where: { id: { [Op.ne]: userId } } });
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: 'internal server error' })
    }
}


exports.postGroupUsers = async (req, res, next) => {
    try {
        const groupName = req.body[0].groupName;
        const userIds = req.body[1];
        const values = Object.values(userIds);
        const group = await Group.create({
            id: uuidv4(),
            groupName: groupName
        })
        const groupId = group.id
        await UserGroup.create({
            groupName : groupName,
            userId: req.user.id,
            groupId: groupId
        })

        const groupCreation = values.forEach(async (userId) => {
            await UserGroup.create({
                groupName: groupName, // getting null error
                userId: userId,
                groupId: groupId,
            });
        });
        res.status(200).json({ message: 'group created successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
}

exports.getGroups = async (req, res, next) => {
    try {
        const userGroups = await userGroup.findAll({ where: { userId: req.user.id } });
        res.status(200).json(userGroups)
    } catch (err) {
        res.status(500).json({ message: 'internal server error' })
    }
}