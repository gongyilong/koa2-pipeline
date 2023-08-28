const JWT = require('jsonwebtoken');
const userService = require('../service/user');
const SECRET = 'gongyilong-gxmap';

module.exports = {
    /**
     * 登录
     */
    login: async(ctx, next) => {
        const { username, password } = ctx.request.body;
        const user = await userService.getUserByName(username);
        if (user) {
            if (password === user[0].Password) {
                ctx.body = {
                    status: true,
                    resultCode: 200,
                    msg: 'success',
                    token: JWT.sign({ u: user[0].UserName, p: user[0].Password }, // 加密userToken
                        SECRET, { expiresIn: '24h' }
                    ),
                    data: user
                };
            } else {
                ctx.body = {
                    status: false,
                    msg: '密码错误！',
                    resultCode: -1,
                }
            }
        } else {
            ctx.body = {
                status: false,
                msg: '用户信息不存在！',
            }
        }
    },

    /**
     * 获取所有用户信息
     */
    getAllUsers: async(ctx, next) => {
        const users = await userService.getAllUsers();
        ctx.type = 'json'; // 通过JSON输出
        ctx.body = {
            status: 0,
            data: users
        };
    },

    /**
     * 获取用户信息（根据username）
     */
    getUserByName: async(ctx, next) => {
        const { username } = ctx.request.body;
        const user = await userService.getUserByName(username);
        if (user) {
            ctx.body = {
                status: 0,
                msg: 'success',
                data: user
            };
        } else {
            ctx.body = {
                status: 1,
                msg: '错误！'
            }
        }
    },

    /**
     * 获取用户信息（根据username）
     */
    getUserById: async(ctx, next) => {
        const { id } = ctx.request.body;
        const user = await userService.getUserById(id);
        if (user) {
            ctx.body = {
                status: 0,
                msg: 'success',
                data: user
            };
        } else {
            ctx.body = {
                status: 1,
                msg: '错误！'
            }
        }
    },

    /**
     * 添加用户
     */
    addUser: async(ctx, next) => {
        const user = ctx.request.body;
        const count = userService.getUserByName(user.UserName);
        ctx.type = 'json';
        if (count > 0) {
            ctx.body = {
                status: 1,
                msg: '当前用户名已存在!',
            };
        } else {
            await userService.createUser(user);
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
    deleteUser: async ctx => {
        const { id } = ctx.request.body;
        await userService.deleteUser(id);
        ctx.type = 'json';
        ctx.body = {
            status: 0,
            message: "删除成功！"
        };
    },

    /**
     * 更新用户
     */
    updateUser: async(ctx, next) => {
        const user = ctx.request.body;
        const statue = await userService.updateUser(user.Id, user);
        ctx.type = 'json';
        if (statue == 1) {
            ctx.body = {
                status: 1,
                message: "修改成功！",
                data: await userService.getUserByName(user.UserName)
            };
        } else {
            ctx.body = {
                status: 0,
                message: "修改失败！",
                data: []
            };
        }
    },
}