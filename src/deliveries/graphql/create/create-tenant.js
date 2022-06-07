const { createTenant } = require('../../../usecases');

const { tenantAdaptors } = require('../../../adaptors');

const { httpResponse } = require('../../../services/http');
const { Logger } = require('../../../services/logger');

const handler = async (event) => {
  console.log('check event from gql');
  console.log(JSON.stringify(event));
  const { params } = JSON.parse(event.input);
  const logger = new Logger(__dirname, handler);
  // request context auth
  try {
    tenantAdaptors.createTenantAdaptor(params);
    const tenant = await createTenant(params);
    // response adaptor
    return httpResponse(200, { tenant });
  } catch (error) {
    logger.debug(error.toString(), error, { tenant: params.tenant });
    return httpResponse(error.statusCode || 500, { message: error.message || 'Failed to create tenant' });
  }
};

module.exports = {
  handler,
};
