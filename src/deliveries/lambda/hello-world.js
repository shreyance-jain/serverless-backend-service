const httpResponse = (statusCode, body, headers = {}) => ({
  statusCode,
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ...headers,
  },
});

const helloWorld = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('hello world from backend serverless service');
    return httpResponse(200, { message: 'hello world serverless! Youre awesome' });
  } catch (error) {
    return httpResponse(error.statusCode || 500, { message: error.toString() || 'Something went wrong!' });
  }
};

module.exports = {
  handler: helloWorld,
};
