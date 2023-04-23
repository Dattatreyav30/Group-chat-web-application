const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Group = sequelize.define('group',{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    groupName : {
        type:Sequelize.STRING,
        allowNull : false
    }
})

module.exports = Group