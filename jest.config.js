module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/__test__/done'],
  verbose: true,
  testURL: 'http://localhost/',
};
