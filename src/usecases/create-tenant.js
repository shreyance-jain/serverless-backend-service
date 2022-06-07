const { tenantRepository } = require('../repositories');

const createTenant = (params) => {
  const tenant = tenantRepository.create({
    ...params,
    createdAt: new Date().valueOf(),
    active: true,
  });
  return tenant;
};

module.exports = {
  createTenant,
};
