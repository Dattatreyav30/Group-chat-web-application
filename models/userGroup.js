const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const userGroup = sequelize.define('userGroup',{
    groupName : {
        type:Sequelize.STRING,
        allowNull : false
    }
})

module.exports = userGroup