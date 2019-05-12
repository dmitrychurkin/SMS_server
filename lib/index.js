const Koa = require('./koa');

module.exports = async () => {
  const koaServer = await new Koa();
  koaServer.run();
};