const https = require('https');

const httpResponse = (statusCode, body, headers = {}) => ({
  statusCode,
  body,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ...headers,
  },
});

const httpsAgent = new https.Agent({
  keepAlive: true,
});

module.exports = {
  httpResponse,
  httpsAgent,
};
