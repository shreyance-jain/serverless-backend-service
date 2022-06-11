const { createTenant } = require('../../../usecases');

const { tenantAdaptors } = require('../../../adaptors');

const { httpResponse } = require('../../../services/http');
const { Logger } = require('../../../services/logger');

const createTenantHandler = async (event) => {
  const { params } = JSON.parse(event.body);
  const logger = new Logger(__dirname, createTenantHandler);
  // request context auth
  try {
    tenantAdaptors.createTenantAdaptor(params);
    const tenant = await createTenant(params);
    // response adaptor
    return httpResponse(200, JSON.stringify(tenant));
  } catch (error) {
    logger.debug(error.toString(), error, { tenant: params.tenant });
    return httpResponse(error.statusCode || 500, { message: error.message || 'Failed to create tenant' });
  }
};

module.exports = {
  handler: createTenantHandler,
};
