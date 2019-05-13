const { IOConnect, IODisconnect } = require('../controllers');
const logger = require('../lib/logger');

module.exports = class {

  constructor(server, IO = require('socket.io')) {
    const io = IO();
    io.attach(server);

    this.io = io;
    this._setListeners();
  }

  _setListeners() {

    const { io } = this;

    io.use(async (socket, next) => {

      const { id } = socket.handshake.query;

      if (typeof id === 'string' && id.length <= process.env.DEVICE_ID_MAX_LENGTH) {

        try {

          await IOConnect(id, socket.id);
          return next();

        } catch (err) {
          logger({ errorMessage: `Error occured on connection while trying to record or update device ${id} in database => `, exit: false })(err);
          return next(err);
        }

      }

      next(new Error('Invalid connection schema'));

    });

    io.on('connection', async socket => {

      socket.on('disconnect', async () => {

        try {

          await IODisconnect(socket.id);

        } catch (err) {
          logger({ errorMessage: `Error occured on disconnection while trying to record or update device with socketId ${socket.id} in database => `, exit: false })(err);
        }

      });

    });

  }

};