const { Logger } = require('../../../services/logger');

const { updateTenant } = require('../../../usecases');

const updateTenantHandler = async (event) => {
  const { params } = event;
  const logger = new Logger(__dirname, updateTenantHandler);
  try {
    // adding a adaptor is un-necessary in gql as it will be handled by request mapping vtl
    const tenantDetails = await updateTenant(params);
    return tenantDetails;
  } catch (error) {
    logger.debug(error.toString(), error, { tenant: params.tenant });
    throw new Error(error.message || 'Failed to update tenant', error);
  }
};

module.exports = {
  handler: updateTenantHandler,
};
