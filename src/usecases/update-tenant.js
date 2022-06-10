const { tenantRepository } = require('../repositories');

const updateTenant = async (params) => {
  const tenantDetails = await tenantRepository.update(params);
  return tenantDetails;
};

module.exports = {
  updateTenant,
};
