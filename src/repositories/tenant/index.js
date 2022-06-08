const { client } = require('../../services/db');

const TABLE_NAME = `${process.env.STAGE}-tenants`;

const getByName = async (tenant) => {
  const res = await client
    .query({
      TableName: TABLE_NAME,
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
      TableName: TABLE_NAME,
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
      TableName: TABLE_NAME,
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

const update = async (updateParams) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        tenant: updateParams.tenant,
      },
      ExpressionAttributeValues: {},
      ExpressionAttributeNames: {},
      ConditionExpression: 'attribute_exists(tenant)',
      UpdateExpression: 'SET',
      ReturnValues: 'ALL_NEW',
    };
    Object.keys(updateParams).forEach((key) => {
      params.ExpressionAttributeNames[`#${key}`] = key;
      params.ExpressionAttributeValues[`:${key}`] = updateParams[key];
    });
    params.UpdateExpression += Object.keys(updateParams)
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
