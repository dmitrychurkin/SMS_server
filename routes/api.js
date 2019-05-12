const router = require('koa-router')();

const { smsController } = require('../controllers');

router.post('/resource/:device_id', smsController());


module.exports = router;