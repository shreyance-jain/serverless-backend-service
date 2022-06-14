module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/constants',
    '<rootDir>/src/errors',
  ],
  reporters: ['jest-progress-bar-reporter'],
  testRegex: 'tests/.*\\.test\\.js',
};
