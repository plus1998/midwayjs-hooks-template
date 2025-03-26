module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/app/test/fixtures'],
    coveragePathIgnorePatterns: ['<rootDir>/app/test/'],
  };