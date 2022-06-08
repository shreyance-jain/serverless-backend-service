const { tenantRepository } = require('../repositories');
const { CustomError } = require('../errors');

const getTenant = async (tenant) => {
  const tenantDetails = await tenantRepository.getByName(tenant);
  if (!tenantDetails) {
    throw new CustomError('No such tenant exists');
  }
  return tenantDetails;
};

module.exports = {
  getTenant,
};
