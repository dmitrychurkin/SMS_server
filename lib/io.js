const { IOClearDevice, IORecordDevice } = require('../controllers');
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
    io.on('connection', async socket => {

      try {

        await IORecordDevice(socket.id);
        socket.on('disconnect', () => IOClearDevice(socket.id));

      } catch (err) {
        logger({ errorMessage: 'Error occured while trying to record device to database => ', exit: false })(err);
      }

    });
  }

};