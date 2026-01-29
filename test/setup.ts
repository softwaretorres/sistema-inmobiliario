/**
 * Global test setup
 */

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-for-testing';
process.env.ENCRYPTION_KEY = '12345678901234567890123456789012';

// Increase Jest timeout for integration tests
jest.setTimeout(30000);

// Mock console.log in tests to reduce noise
// Uncomment if needed:
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
// };
