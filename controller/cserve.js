const cserveService = require('../service/cserve');

module.exports = {
    /**
     * 获取所有服务信息
     */
    getAllCServes: async(ctx, next) => {
        const cserves = await cserveService.getAllCServes();
        ctx.type = 'json'; // 通过JSON输出
        ctx.body = {
            status: 0,
            data: cserves
        };
    },

    /**
     * 获取服务信息(根据类型)
     */
    getCServeByName: async(ctx, next) => {
        const { Title } = ctx.request.body;
        const cserve = await cserveService.getCServeByName(Title);
        if (cserve) {
            ctx.body = {
                status: 0,
                msg: 'success',
                data: cserve
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
    getCServeById: async(ctx, next) => {
        const { id } = ctx.request.body;
        const cserve = await cserveService.getCServeById(id);
        if (cserve) {
            ctx.body = {
                status: 0,
                msg: 'success',
                data: cserve
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
    addCServe: async(ctx, next) => {
        const cserve = ctx.request.body;
        const count = cserveService.getCServeByName(cserve.Title);
        ctx.type = 'json';
        if (count > 0) {
            ctx.body = {
                status: 1,
                msg: '当前记录已存在!',
            };
        } else {
            await cserveService.createCServe(cserve);
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
    deleteCServe: async ctx => {
        const { id } = ctx.request.body;
        await cserveService.deleteCServe(id);
        ctx.type = 'json';
        ctx.body = {
            status: 0,
            message: "删除成功！"
        };
    },

    /**
     * 更新服务
     */
    updateCServe: async(ctx, next) => {
        const cserve = ctx.request.body;
        await cserveService.updateCServe(cserve.Id, cserve);
        ctx.type = 'json';
        ctx.body = {
            status: 0,
            message: "修改成功！"
        };
    }
}