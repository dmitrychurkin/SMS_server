const Device = require('../models/Device');
const logger = require('../lib/logger');

module.exports = async (deviceId, socketId) => {
  try {

    const query = { deviceId };
    const update = {
      connected: true,
      socketId,
      $setOnInsert: {
        deviceId
      }
    };

    await Device.findOneAndUpdate(query, update, { upsert: true });

  } catch (err) {
    logger({ errorMessage: 'Error occured while trying to create or update device in database => ', exit: false })(err);
  }

};