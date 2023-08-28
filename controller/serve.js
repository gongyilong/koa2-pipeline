const serveService = require('../service/serve');

module.exports = {
    /**
     * 获取所有服务信息
     */
    getAllServes: async(ctx, next) => {
        const serves = await serveService.getAllServes();
        ctx.type = 'json'; // 通过JSON输出
        ctx.body = {
            status: 0,
            data: serves
        };
    },

    /**
     * 获取服务信息(根据类型)
     */
    getServeByType: async(ctx, next) => {
        const { type } = ctx.request.body;
        const serve = await serveService.getServeByType(type);
        if (serve) {
            ctx.body = {
                status: 0,
                msg: 'success',
                data: serve
            };
        } else {
            ctx.body = {
                status: 1,
                msg: '错误！'
            }
        }
    },

    /**
     * 获取服务信息(根据Id)
     */
    getServeById: async(ctx, next) => {
        const { id } = ctx.request.body;
        const serve = await serveService.getServeById(id);
        if (serve) {
            ctx.body = {
                status: 0,
                msg: 'success',
                data: serve
            };
        } else {
            ctx.body = {
                status: 1,
                msg: '错误！'
            }
        }
    },

    /**
     * 添加服务
     */
    addServe: async(ctx, next) => {
        const serve = ctx.request.body;
        const count = serveService.getServeByType(serve.serveName);
        ctx.type = 'json';
        if (count > 0) {
            ctx.body = {
                status: 1,
                msg: '当前用户名已存在!',
            };
        } else {
            await serveService.createServe(serve);
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
    deleteServe: async ctx => {
        const { id } = ctx.request.body;
        await serveService.deleteServe(id);
        ctx.type = 'json';
        ctx.body = {
            status: 0,
            message: "删除成功！"
        };
    },

    /**
     * 更新服务
     */
    updateServe: async(ctx, next) => {
        // const id = ctx.params.id;
        const serve = ctx.request.body;
        await serveService.updateServe(serve.Id, serve);
        ctx.type = 'json';
        ctx.body = {
            status: 0,
            message: "修改成功！"
        };
    }
}