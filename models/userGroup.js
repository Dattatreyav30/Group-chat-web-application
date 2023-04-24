const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const userGroup = sequelize.define('userGroup',{
    groupName : {
        type:Sequelize.STRING,
        allowNull : false
    },
    isAdmin : {
        type:Sequelize.BOOLEAN
    }
})

module.exports = userGroup