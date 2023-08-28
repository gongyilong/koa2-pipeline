const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

// 地图服务表
const Serve = sequelize.define('tbl_serves', {
    Id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    serveName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Alias: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Type: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

Serve.sync({ force: false });

module.exports = {
    Serve
};