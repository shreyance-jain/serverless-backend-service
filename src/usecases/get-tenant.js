const { tenantRepository } = require('../repositories');
const { CustomError } = require('../errors');

const getTenant = (tenant) => {
  const tenantDetails = tenantRepository.getByName(tenant);
  if (!tenantDetails) {
    throw new CustomError('No such tenant exists', 404);
  }
  return tenantDetails;
};

module.exports = {
  getTenant,
};
