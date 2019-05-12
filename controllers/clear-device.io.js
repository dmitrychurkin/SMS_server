const Device = require('../models/Device');
const logger = require('../lib/logger');

module.exports = async deviceId => {
  try {
    const { n } = await Device.remove({ deviceId });
    let logMessage = `Device wasn't found in database`;
    if (n > 0) {
      logMessage = 'Device been removed from database upon disconnection from socket';
    }
    logger({ logMessage });
  } catch (err) {
    logger({ errorMessage: 'Error occured while trying remove device from database => ', exit: false })(err);
  }
};