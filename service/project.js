const { Project } = require('../model/project');

class ProjectService {

    /**
     * 获取所有工程项目档案信息
     */
    async getAllProjects() {
        return Project.findAll({
            // attributes: ['id', 'name'], // 当前接口查询返回结果只包含这两列
            order: [
                ['Id', 'ASC'],
            ],
        });
    };

    /**
     * 根据id获取工程项目档案信息
     * @param {*} id 
     */
    async getProjectById(id) {
        return Project.findAll({
            where: {
                Id: id,
            },
        });
    };

    /**
     * 根据工程名获取工程档案信息
     * @param {*} name 
     */
    async getProjectByName(name) {
        return Project.findAll({
            where: {
                LicCode: name,
            },
            raw: true
        });
    };

    /**
     * 创建工程档案记录
     * @param {*} project 
     */
    async createProject(project) {
        return Project.create(project);
    };

    /**
     * 根据id删除工程档案记录
     * @param {*} id
     */
    async deleteProject(id) {
        const item = await this.getProjectById(id);
        if (item.length > 0) {
            return Project.destroy({
                where: {
                    Id: id,
                }
            });
        }
    }

    /**
     * 更新项目档案信息
     * @param {*} id 
     * @param {*} project 
     */
    async updateProject(id, project) {
        const item = await this.getProjectById(id);
        if (item) {
            return Project.update(project, {
                where: {
                    Id: id,
                }
            });
        } else {
            throw new Error('用户不存在!');
        }
    };
};

module.exports = new ProjectService();