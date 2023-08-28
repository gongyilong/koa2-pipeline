const Koa = require('koa');
const cors = require('koa2-cors'); //跨域访问
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const koajwt = require('koa-jwt');
const SECRET = 'gongyilong-gxmap';

const app = new Koa();
app.use(bodyParser());
app.use(cors());

//koa-jwt，中间件对token进行验证
app.use(async(ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                msg: err.message
            }
        } else {
            throw err;
        }
    })
});

app.use(koajwt({ secret: SECRET }).unless({
    // 登录接口不需要验证
    path: [/api\/v1\/login/]
}));

app.use(router.routes());

app.listen(3006, () => {
    console.log('Server is running!');
})