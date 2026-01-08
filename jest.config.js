/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests/unit'],
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    'assets/js/bundle-builder/**/*.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/assets/js/bundle-builder/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  verbose: true
};
