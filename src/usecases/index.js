const { createTenant } = require('./create-tenant');
const { getTenant } = require('./get-tenant');
const { deleteTenant } = require('./delete-tenant');

module.exports = {
  createTenant,
  getTenant,
  deleteTenant,
};
