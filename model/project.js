const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

// 项目档案信息表
const Project = sequelize.define('tbl_project', {
    Id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    PrjName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    //工程项目编码
    PrjNo: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    //规划许可证号
    LicCode: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    //年份
    Year: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Link: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

Project.sync({ force: false });

module.exports = {
    Project
};