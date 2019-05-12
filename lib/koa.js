const { PORT, SESSION_SECRET } = process.env;

const Koa = require('koa');
const http = require('http');

const logger = require('koa-logger');
const koaqs = require('koa-qs');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const MongoDB = require('./db');
const IO = require('./io');
const render = require('./render');
const loggerHandler = require('./logger');
const router = require('../routes');

module.exports = class {

  constructor() {

    return (async () => {
      const { app, server } = await this._init();
      app.keys = [SESSION_SECRET];

      koaqs(app);

      app
        .use(logger())
        .use(session({}, app))
        .use(bodyParser())
        .use(render)
        .use(router.routes())
        .use(router.allowedMethods());

      this.server = server;
      return this;
    })()
  }

  async _init() {

    try {
      await MongoDB.connect();
      const app = new Koa();
      const server = http.createServer(app.callback());
      app.context.io = new IO(server).io;
      return {
        app,
        server
      };
    } catch (err) {
      loggerHandler({ errorMessage: 'Error occured while connecting to database' })(err);
    }

  }

  run() {
    this.server.listen(PORT, loggerHandler({
      errorMessage: 'Error occured while starting server',
      logMessage: `Server running on port ${PORT || 80}`,
      logImmediate: false
    }));
  }

};