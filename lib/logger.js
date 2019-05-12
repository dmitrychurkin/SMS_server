const { APP_NAME } = process.env;
const debug = require('debug');
const error = debug(`${APP_NAME}:error`);
const log = debug(`${APP_NAME}:log`);
log.log = console.log.bind(console);

module.exports = ({ errorMessage, logMessage, logImmediate = true, exit = true }) => {
  if (logImmediate && typeof logMessage === 'string') {
    return log(logMessage);
  }
  return err => {
    if (err) {
      error(`${errorMessage}%O`, err);
      return exit && process.exit(1);
    }
    log(logMessage);
  };
};