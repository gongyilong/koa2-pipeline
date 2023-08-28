const { CServe } = require('../model/cserve');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class CServeService {

    /**
     * 获取所有服务信息
     */
    async getAllCServes() {
        return CServe.findAll({
            // attributes: ['id', 'name'], // 当前接口查询返回结果只包含这两列
            order: [
                ['Id', 'ASC'],
            ],
        });
    };

    /**
     * 根据id获取服务记录
     * @param {*} id 
     */
    async getCServeById(id) {
        return CServe.findAll({
            where: {
                Id: id,
            },
        });
    };

    /**
     * 根据名称获取服务记录
     * @param {*} name 
     */
    async getCServeByName(name) {
        return CServe.findAll({
            where: {
                Title: {
                    [Op.like]: '%' + name + '%'
                },
            },
            raw: true
        });
    };

    /**
     * 创建服务记录
     * @param {*} cserve 
     */
    async createCServe(cserve) {
        return CServe.create(cserve);
    };

    /**
     * 根据id删除服务记录
     * @param {*} id
     */
    async deleteCServe(id) {
        const item = await this.getCServeById(id);
        if (item.length > 0) {
            return CServe.destroy({
                where: {
                    Id: id,
                }
            });
        }
    }

    /**
     * 更新服务信息
     * @param {*} id 
     * @param {*} cserve 
     */
    async updateCServe(id, cserve) {
        const item = await this.getCServeById(id);
        if (item) {
            return CServe.update(cserve, {
                where: {
                    Id: id,
                }
            });
        } else {
            throw new Error('用户不存在!');
        }
    };
};

module.exports = new CServeService();