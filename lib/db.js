const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = class {

  static async connect() {
    try {
      const mongooseConn = await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
      logger({ logMessage: 'Successfully connected to database' });
      return mongooseConn;
    } catch (err) {
      logger({ errorMessage: 'Error occured while connecting to database => ' })(err);
    }
  }

};