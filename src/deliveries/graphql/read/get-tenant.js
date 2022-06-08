const { Logger } = require('../../../services/logger');

const { getTenant } = require('../../../usecases');

const getTenantHandler = async (event) => {
  const { tenant } = event;
  const logger = new Logger(__dirname, getTenantHandler);
  try {
    // adding a adaptor is un-necessary in gql as it will be handled by request mapping vtl
    const tenantDetails = await getTenant(tenant);
    return tenantDetails;
  } catch (error) {
    logger.debug(error.toString(), error, { tenant });
    throw new Error(error.message || 'Failed to get tenant details', error);
  }
};

module.exports = {
  handler: getTenantHandler,
};
