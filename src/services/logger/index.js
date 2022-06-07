/*
Logger can be published as a separate npm package
which can then be shared and used among micro-services
It will send request to a central logging service publishing logs in
elastic search which can then be analysed using Kibana.

For the purpose of this assignment, just creating methods and
logging using console, which can then be sent to cloudwatch
and can be seen under lambda montioring in AWS Console
*/

const { basename, extname } = require('path');

class Logger {
  constructor(path, func = () => {}) {
    this.handlerInfo = {
      apiModule: basename(path, extname(path)),
      apiHandler: func.name,
    };
  }

  log(message, error, additionalParams, level = 'info') {
    /*
      In prod: Create keys and send request to central logging service
     */
    const payload = {
      ...this.handlerInfo,
      level,
      message,
      error,
      additionalParams,
      serviceId: '',
    };
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(payload));
  }

  debug(message, error, additionalParams) {
    /*
      In prod: Create keys and send request to central logging service
     */
    this.log(message, error, additionalParams, 'debug');
  }
}

module.exports = {
  Logger,
};
