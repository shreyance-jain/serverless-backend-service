const { tenantRepository } = require('../repositories');

const createTenant = async (params) => {
  const tenant = await tenantRepository.create({
    ...params,
    createdAt: new Date().valueOf(),
    active: true,
  });
  return tenant;
};

module.exports = {
  createTenant,
};
