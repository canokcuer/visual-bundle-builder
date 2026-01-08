/**
 * Jest setup file for Cyrasoul Bundle Builder tests
 */

// Mock Shopify global object
global.Shopify = {
  currency: {
    active: 'TRY',
    rate: '1.0'
  },
  locale: 'tr'
};

// Mock navigator.vibrate
Object.defineProperty(navigator, 'vibrate', {
  value: jest.fn(() => true),
  writable: true
});

// Mock fetch for Shopify cart API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ items: [] })
  })
);

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
});
