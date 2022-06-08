const { createTenant } = require('./create-tenant');
const { getTenant } = require('./get-tenant');
const { deleteTenant } = require('./delete-tenant');
const { updateTenant } = require('./update-tenant');

module.exports = {
  createTenant,
  getTenant,
  deleteTenant,
  updateTenant,
};
