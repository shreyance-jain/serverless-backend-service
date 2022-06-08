const { Logger } = require('../../../services/logger');

const { deleteTenant } = require('../../../usecases');

const deleteTenantHandler = async (event) => {
  const { tenant } = event;
  const logger = new Logger(__dirname, deleteTenantHandler);
  try {
    // adding a adaptor is un-necessary in gql as it will be handled by request mapping vtl
    const tenantDetails = await deleteTenant(tenant);
    return tenantDetails;
  } catch (error) {
    logger.debug(error.toString(), error, { tenant });
    throw new Error(error.message || 'Failed to delete tenant', error);
  }
};

module.exports = {
  handler: deleteTenantHandler,
};
