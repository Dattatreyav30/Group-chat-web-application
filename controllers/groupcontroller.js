const User = require('../models/userModel');

const { Op } = require('sequelize');

const Group = require('../models/groupModel');

const UserGroup = require('../models/userGroup');

const { v4: uuidv4 } = require('uuid');

require('dotenv').config();


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
            groupName: groupName,
            userId: req.user.id,
            groupId: groupId,
            isAdmin: true
        })

        const groupCreation = values.forEach(async (userId) => {
            await UserGroup.create({
                groupName: groupName,
                userId: userId,
                groupId: groupId,
            });
        });
        res.status(200).json({ message: 'group created successfully' })
    } catch (err) {
        res.status(500).json({ message: 'internal server error' })
    }
}

exports.getGroups = async (req, res, next) => {
    try {
        const userGroups = await UserGroup.findAll({ where: { userId: req.user.id } });
        res.status(200).json(userGroups)
    } catch (err) {
        res.status(500).json({ message: 'internal server error' })
    }
}
exports.getGroupUsers = async (req, res, next) => {
    try {
        const groupId = req.header('groupId');
        const userGroupList = await UserGroup.findAll({
            where: {
                groupId: groupId,
            }
        })
        const userIds = await userGroupList.map(userGroup => userGroup.userId);
        const userList = await User.findAll({
            where: { id: userIds }
        });
        const userNames = await userList.map(user => user.name);
        res.status(200).json(userNames)
    } catch (err) {
        res.status(500).json({ message: 'internel server error' })
    }
}


exports.removeUser = async (req, res, next) => {
    try {
        const name = req.body.name;
        const userId = await User.findOne({
            where: { name: name }
        })

        const checkAdmin = await UserGroup.findOne({
            where: {
                userId: req.user.id,
                isAdmin: true
            }
        })

        if (!checkAdmin) {
            return res.status(401).json({ message: 'you are not a admin' })
        }
        const user = await UserGroup.findOne({
            where: {
                userId: userId.id,
                isAdmin: null
            }
        })
        if (!user) {
            return res.status(401).json({ message: 'you cant delete the admin' })
        }
        await user.destroy();
        return res.status(200).json({ message: 'user deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'server error while deleting user' })
    }
}

exports.makeAdmin = async (req, res, next) => {
    try {
        const checkAdmin = await UserGroup.findOne({
            where: {
                userId: req.user.id,
                isAdmin: true
            }
        })
        if (!checkAdmin) {
            return res.status(401).json({ message: 'you are not a admin' })
        }
        const name = req.body.name;
        const user = await User.findOne({
            where: {
                name: name
            }
        })
        const existingAdmin = await UserGroup.findOne({
            where: {
                userId: user.id,
                isAdmin: true
            }
        })
        if (existingAdmin) {
            return res.status(400).json({ message: 'User is already an admin' })
        }
        const admin = await UserGroup.update({
            isAdmin: true
        }, {
            where: {
                userId: user.id
            }
        })
        res.status(200).json({ message: 'User has been made an admin' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to make user an admin' })
    }
}



exports.newusers = async (req, res, next) => {
    try {
        const existingAdmin = UserGroup.findOne({
            where: {
                userId: req.user.id,
                isAdmin: true
            }
        })
        if (!existingAdmin) {
            return res.status(401).json({ message: 'you nare not a admin ' })
        }

        const groupId = req.header('groupId');
        const groupUsers = await UserGroup.findAll({
            where: {
                groupId: groupId
            }
        })
        const userIds = await groupUsers.map(user => user.userId);
        const users = await User.findAll({
            where: {
                id: {
                    [Op.notIn]: userIds
                }
            }
        })
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: 'internal server error' });
        console.log(err)
    }
}

exports.addnewuser = async (req, res, next) => {
    try {
        const existingAdmin = await UserGroup.findOne({
            where: {
                userId: req.user.id,
                isAdmin: true
            }
        })
        console.log(existingAdmin)
        if (!existingAdmin) {
            return res.status(401).json({ message: 'you nare not a admin ' })
        }
        const groupId = req.header('groupId');
        const userId = req.body.id;
        const groupName = req.header('groupName');
        await UserGroup.create({
            groupName: groupName,
            userId: userId,
            groupId: groupId,
        })
        res.status(200).json({ message: 'user added successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }

}



