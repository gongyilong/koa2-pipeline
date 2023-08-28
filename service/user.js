const { User } = require('../model/user');

class UserService {

    /**
     * 获取所有用户信息
     */
    async getAllUsers() {
        return User.findAll({
            // attributes: ['id', 'name'], // 当前接口查询返回结果只包含这两列
            order: [
                ['Id', 'ASC'],
            ],
        });
    };

    /**
     * 根据id获取用户记录
     * @param {*} id 
     */
    async getUserById(id) {
        return User.findAll({
            where: {
                Id: id,
            },
        });
    };

    /**
     * 根据id删除服务记录
     * @param {*} id
     */
    async deleteUser(id) {
        const item = await this.getUserById(id);
        if (item.length > 0) {
            return User.destroy({
                where: {
                    Id: id,
                }
            });
        }
    }

    /**
     * 根据名称获取用户记录
     * @param {*} name 
     */
    async getUserByName(name) {
        return User.findAll({
            where: {
                UserName: name,
            },
            raw: true
        });
    };

    /**
     * 创建用户记录
     * @param {*} user 
     */
    async createUser(user) {
        return User.create(user);
    };

    /**
     * 更新用户信息
     * @param {*} id 
     * @param {*} user 
     */
    async updateUser(id, user) {
        const item = await this.getUserById(id);
        if (item) {
            return User.update(user, {
                where: {
                    Id: id,
                }
            });
        } else {
            throw new Error('用户不存在!');
        }
    };
};

module.exports = new UserService();