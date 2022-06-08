const { createTenant } = require('../../../usecases');

const { tenantAdaptors } = require('../../../adaptors');

const { Logger } = require('../../../services/logger');

const handler = async (event) => {
  const { params } = event;
  const logger = new Logger(__dirname, handler);
  // request context auth
  try {
    tenantAdaptors.createTenantAdaptor(params);
    const tenant = await createTenant(params);
    // response adaptor
    return tenant;
  } catch (error) {
    logger.debug(error.toString(), error, { tenant: params.tenant });
    throw new Error(error.message || 'Failed to create tenant', error);
  }
};

module.exports = {
  handler,
};
