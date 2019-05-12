const Device = require('../models/Device');
const logger = require('../lib/logger');

module.exports = async deviceId => {
  try {
    const device = await Device.create({ deviceId });
    if (device && typeof device === 'object') {
      logger({ logMessage: `Device ${device.deviceId} been recorded to database` });
    }
  } catch (err) {
    logger({ errorMessage: 'Error occured while trying to record device to database => ', exit: false })(err);
  }
};