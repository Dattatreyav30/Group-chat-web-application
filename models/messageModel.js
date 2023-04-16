const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Message  = sequelize.define('message',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    messages:{
        type:Sequelize.STRING
    }
})

module.exports = Message