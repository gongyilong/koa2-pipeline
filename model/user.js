const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

// 用户信息表
const User = sequelize.define('tbl_user', {
    Id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    UserName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Department: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Role: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    PhoneNum: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    LoginTime: {
        type: Sequelize.DATE,
        allowNull: true,
    }
});

User.sync({ force: false });

module.exports = {
    User
};