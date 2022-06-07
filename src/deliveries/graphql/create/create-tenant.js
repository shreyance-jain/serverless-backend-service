const { createTenant } = require('../../../usecases');

const { tenantAdaptors } = require('../../../adaptors');

const { httpResponse } = require('../../../services/http');
const { Logger } = require('../../../services/logger');

const handler = async (event) => {
  const { params } = event;
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
