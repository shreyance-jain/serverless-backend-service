const AWS = require('aws-sdk');
const { httpsAgent } = require('../http');

const dynmodb = new AWS.DynamoDB.DocumentClient({
  maxRetries: 3,
  httpOptions: {
    connectTimeout: 1000,
    agent: httpsAgent,
  },
  convertEmptyValues: true,
});

module.exports = {
  client: dynmodb,
};
