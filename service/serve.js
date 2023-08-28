const { Serve } = require('../model/serve');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ServeService {

    /**
     * 获取所有服务信息
     */
    async getAllServes() {
        return Serve.findAll({
            // attributes: ['id', 'name'], // 当前接口查询返回结果只包含这两列
            order: [
                ['id', 'ASC'],
            ],
        });
    };

    /**
     * 根据id获取服务记录
     * @param {*} id 
     */
    async getServeById(id) {
        return Serve.findAll({
            where: {
                Id: id,
            },
        });
    };

    /**
     * 根据类型获取服务记录
     * @param {*} name 
     */
    async getServeByType(name) {
        return Serve.findAll({
            where: {
                Type: {
                    [Op.like]: '%' + name + '%'
                },
            },
            raw: true
        });
    };

    /**
     * 创建服务记录
     * @param {*} serve 
     */
    async createServe(serve) {
        return Serve.create(serve);
    };

    /**
     * 根据id删除服务记录
     * @param {*} id
     */
    async deleteServe(id) {
        const item = await this.getServeById(id);
        if (item.length > 0) {
            return Serve.destroy({
                where: {
                    Id: id,
                }
            });
        }
    }

    /**
     * 更新服务信息
     * @param {*} id 
     * @param {*} serve 
     */
    async updateServe(id, serve) {
        const item = await this.getServeById(id);
        if (item) {
            return Serve.update(serve, {
                where: {
                    Id: id,
                }
            });
        } else {
            throw new Error('用户不存在!');
        }
    };
};

module.exports = new ServeService();