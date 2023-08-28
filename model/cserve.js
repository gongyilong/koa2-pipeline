const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

// CESIUM 服务表
const CServe = sequelize.define('tbl_cserves', {
    Id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Url: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    PId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Type: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

CServe.sync({ force: false });

module.exports = {
    CServe
};