const { client } = require('../../services/db');
const { CustomError } = require('../../errors');

const TABLE_NAME = `${process.env.STAGE}-tenants`;

const getByName = async (tenant) => {
  const res = await client
    .query({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'tenant = :tenant',
      ExpressionAttributeValues: {
        ':tenant': tenant,
      },
      ExpressionAttributeNames: {
        '#tenant': 'tenant',
      },
      ProjectionExpression: '#tenant',
    }).promise();
  if (res.Items.length) {
    return res.Items[0];
  }
  return null;
};

const create = async (params) => {
  const duplicateTenant = await getByName(params.tenant);
  if (duplicateTenant) {
    throw new CustomError('Tenant with this name already exist', 409);
  }
  await client.put({
    TableName: TABLE_NAME,
    Item: {
      ...params,
    },
  }).promise();
  return params;
};

module.exports = {
  getByName,
  create,
};
