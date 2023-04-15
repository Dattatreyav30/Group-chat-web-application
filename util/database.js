const Sequelize = require('sequelize');

const sequelize = new Sequelize('group_chat', 'root', 'Mykoshi@3', {
    dialect : 'mysql',
    host : 'localhost'
})
module.exports = sequelize;