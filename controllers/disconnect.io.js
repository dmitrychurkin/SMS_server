const Device = require('../models/Device');
const logger = require('../lib/logger');

module.exports = async socketId => {
  try {

    const query = { socketId };
    const update = {
      connected: false,
      $unset: {
        socketId: ''
      }
    };

    await Device.findOneAndUpdate(query, update);

  } catch (err) {
    logger({ errorMessage: 'Error occured while trying to update device on disconnection in database => ', exit: false })(err);
  }

};