
require('dotenv').config();
const logger = require('./lib/logger');
require('./lib')()
    .catch(logger({ errorMessage: 'Error occured while starting server => ' }));
