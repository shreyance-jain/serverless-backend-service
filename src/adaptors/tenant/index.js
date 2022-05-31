const { CustomError } = require('../../errors');

const tenantTypes = {
  test: 'test',
  poc: 'poc',
};

const createTenantAdaptor = (event) => {
  const { tenant, tenantType } = event;
  if (!tenant || !tenantType) {
    throw new CustomError('Missing required parameters', 400);
  }
  if (!tenantTypes[tenantType.toLowerCase()]) {
    throw new CustomError('Invalid tenant type', 400);
  }
};

module.exports = {
  createTenantAdaptor,
};
