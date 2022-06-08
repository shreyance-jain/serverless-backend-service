const { tenantRepository } = require('../repositories');

const deleteTenant = async (tenant) => {
  const tenantDetails = await tenantRepository.setInactive(tenant);
  return tenantDetails;
};

module.exports = {
  deleteTenant,
};
