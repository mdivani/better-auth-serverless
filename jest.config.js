/* eslint-disable no-undef */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/repositories/*.{js,ts}'],
  collectCoverage: true,
  testTimeout: 60000,
  moduleDirectories: ['node_modules', 'src', 'test'],
  setupFiles: ['<rootDir>/src/test/setEnvVars.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.{ts,js}'],
  modulePaths: ['<rootDir>/src/test/', '<rootDir>/src/lib', '<rootDir>/src/functions'],
  moduleNameMapper: {
    '^@functions/(.*)$': '<rootDir>/src/functions/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@test/(.*)$': '<rootDir>/src/test/$1',
  },
  coverageThreshold: {
    global: {
      statements: 40,
    },
  },
};
