const { client } = require('../../services/db');
const { tenantsTable } = require('../../constants');

const getByName = async (tenant) => {
  const res = await client
    .query({
      TableName: tenantsTable,
      KeyConditionExpression: 'tenant = :tenant',
      ExpressionAttributeValues: {
        ':tenant': tenant,
      },
    }).promise();
  if (res.Items.length) {
    return res.Items[0];
  }
  return null;
};

const create = async (params) => {
  try {
    await client.put({
      TableName: tenantsTable,
      Item: {
        ...params,
      },
      ConditionExpression: 'attribute_not_exists(tenant)',
    }).promise();
    return params;
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      throw new Error('Tenant already exist', err);
    }
    throw err;
  }
};

const setInactive = async (tenant) => {
  try {
    const data = await client.update({
      TableName: tenantsTable,
      Key: {
        tenant,
      },
      ExpressionAttributeValues: {
        ':active': false,
      },
      ExpressionAttributeNames: {
        '#active': 'active',
      },
      ConditionExpression: 'attribute_exists(tenant)',
      UpdateExpression: 'SET #active = :active',
      ReturnValues: 'ALL_NEW',
    }).promise();
    return data.Attributes;
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      throw new Error('Tenant with this name does not exist', err);
    }
    throw err;
  }
};

const update = async (data) => {
  try {
    const params = {
      TableName: tenantsTable,
      Key: {
        tenant: data.tenant,
      },
      ExpressionAttributeValues: {},
      ExpressionAttributeNames: {},
      ConditionExpression: 'attribute_exists(tenant)',
      UpdateExpression: 'SET',
      ReturnValues: 'ALL_NEW',
    };
    const { tenant, ...paramsToUpdate } = data;
    Object.keys(paramsToUpdate).forEach((key) => {
      params.ExpressionAttributeNames[`#${key}`] = key;
      params.ExpressionAttributeValues[`:${key}`] = paramsToUpdate[key];
    });
    params.UpdateExpression += Object.keys(paramsToUpdate)
      .map((key) => ` #${key} = :${key}`)
      .join(',');
    const res = await client.update(params).promise();
    return res.Attributes;
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      throw new Error('Tenant with this name does not exist', err);
    }
    throw err;
  }
};

module.exports = {
  getByName,
  create,
  setInactive,
  update,
};
