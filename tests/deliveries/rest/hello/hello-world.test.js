const { handler } = require('../../../../src/deliveries/rest/hello/hello-world');

describe('hello world lamdba', () => {
  it('should return with hello world message', async () => {
    const response = await handler();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify({ message: 'hello world serverless! Youre awesome' }));
  });
});
