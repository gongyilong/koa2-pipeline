const projectService = require('../service/project');

module.exports = {
    /**
     * 获取所有工程项目档案信息
     */
    getAllProjects: async(ctx, next) => {
        const projects = await projectService.getAllProjects();
        ctx.type = 'json'; // 通过JSON输出
        ctx.body = {
            status: 0,
            data: projects
        };
    },

    /**
     * 获取工程项目档案信息(根据项目名称)
     */
    getProjectByName: async(ctx, next) => {
        const { prjName } = ctx.request.body;
        const projects = await projectService.getProjectByName(prjName);
        if (projects) {
            ctx.body = {
                status: 0,
                msg: 'success',
                data: projects
            };
        } else {
            ctx.body = {
                status: 1,
                msg: '错误！'
            }
        }
    },

    /**
     * 获取工程项目档案信息(根据Id)
     */
    getProjectById: async(ctx, next) => {
        const { id } = ctx.request.body;
        const project = await projectService.getProjectById(id);
        if (project) {
            ctx.body = {
                status: 0,
                msg: 'success',
                data: project
            };
        } else {
            ctx.body = {
                status: 1,
                msg: '错误！'
            }
        }
    },

    /**
     * 添加工程项目信息
     */
    addProject: async(ctx, next) => {
        const project = ctx.request.body;
        const count = projectService.getProjectByName(project.prjName);
        ctx.type = 'json';
        if (count > 0) {
            ctx.body = {
                status: 1,
                msg: '当前用户名已存在!',
            };
        } else {
            await projectService.createProject(project);
            ctx.type = 'json';
            ctx.body = {
                status: 0,
                msg: '创建成功！',
            };
        }
    },

    /**
     * 删除服务记录
     */
    deleteProject: async ctx => {
        const { id } = ctx.request.body;
        await projectService.deleteProject(id);
        ctx.type = 'json';
        ctx.body = {
            status: 0,
            message: "删除成功！"
        };
    },

    /**
     * 更新服务
     */
    updateProject: async(ctx, next) => {
        // const id = ctx.params.id;
        const project = ctx.request.body;
        await projectService.updateProject(project.Id, project);
        ctx.type = 'json';
        ctx.body = {
            status: 0,
            message: "修改成功！"
        };
    },
}