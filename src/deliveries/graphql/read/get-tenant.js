const { httpResponse } = require('../../../services/http');

const handler = async (event) => {
  console.log('check event from gql');
  console.log(JSON.stringify(event));
  return httpResponse(200, { tenant: 'test' });
};

module.exports = {
  handler,
};
