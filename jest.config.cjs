/**
 * Jest configuration for this Vite + React project.
 *
 * Notes:
 * - The project uses ESM ("type": "module"); Jest runs in ESM mode via
 *   NODE_OPTIONS=--experimental-vm-modules (configured in package.json scripts).
 * - SWC transforms JSX quickly without needing a Babel pipeline.
 */

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.js'],
  testMatch: ['<rootDir>/src/**/*.test.jsx', '<rootDir>/src/**/*.test.js'],
  transform: {
    '^.+\\.[jt]sx?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '\\.(css|less|s[ac]ss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/main.jsx'],
};
