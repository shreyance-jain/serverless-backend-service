const { httpResponse } = require('../../../services/http');
const { Logger } = require('../../../services/logger');

const { getTenant } = require('../../../usecases');

const getTenantHandler = async (event) => {
  const { tenant } = event;
  const logger = new Logger(__dirname, getTenantHandler);
  try {
    // adding a adaptor is un-necessary in gql as it will be handled by request mapping vtl
    const tennatDetails = await getTenant(tenant);
    return httpResponse(200, tennatDetails);
  } catch (error) {
    logger.debug(error.toString(), error, { tenant });
    return httpResponse(error.statusCode || 500, { message: error.message || 'Failed to get tenant details' });
  }
};

module.exports = {
  handler: getTenantHandler,
};
