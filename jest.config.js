module.exports = {
  projects: [
    {
      preset: 'ts-jest',
      collectCoverageFrom: ['<rootDir>/src/*.ts'],
      testEnvironment: 'jsdom',
    },
    {
      preset: 'ts-jest',
      collectCoverageFrom: ['<rootDir>/src/*.ts'],
      testEnvironment: 'node',
    },
  ],
};
