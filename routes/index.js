const router = require('koa-router')();


const api = require('./api');
router.use('/api', api.routes());

const web = require('./web');
router.use(web.routes());



module.exports = router;