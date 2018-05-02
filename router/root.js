const Router = require('koa-router');
const router = new Router();

router
    .get('/', async (ctx) => {
        await ctx.render('home', {});
    })
    .get('/home', async (ctx) => {
        await ctx.render('home', {});
    });

module.exports = router;