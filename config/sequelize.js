/**
 * Node的ORM框架Sequelize,
 * ORM即Object Relational Mapping，中文叫“对象关系映射”
 */
const Sequelize = require('sequelize');
const config = require('./dbInfo');
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    pool: { //连接池设置
        max: 5, //最大连接数
        min: 0, //最小连接数
        idle: 10000
    },
    define: {
        timestamps: false //禁用时间戳
    }
});

sequelize.sync({
    force: false // 每次启动都重新自动创建表
});

module.exports = sequelize;