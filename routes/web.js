const router = require('koa-router')();

// Development path only
router.get('/', async ctx => await ctx.render('index'));


module.exports = router;