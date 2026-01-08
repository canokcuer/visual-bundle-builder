/**
 * Utility functions for the Visual Bundle Builder
 */

/**
 * Match a product title to its canonical handle
 * @param {string} title - Product title
 * @returns {string} Normalized handle
 */
function matchHandle(title) {
  const normalized = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const handles = ['dreamglow', 'dailyglow', 'mindfuel', 'thechill', 'resetbutton'];
  for (const h of handles) {
    if (normalized.includes(h.replace('-', ''))) {
      return h === 'resetbutton' ? 'reset-button' : h;
    }
  }
  return normalized;
}

/**
 * Format price in Turkish Lira
 * @param {number} cents - Price in cents/kurus
 * @returns {string} Formatted price
 */
function formatMoney(cents) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0
  }).format(cents / 100);
}

/**
 * Trigger device vibration (mobile)
 * @param {number|number[]} pattern - Vibration pattern
 * @returns {boolean} Whether vibration was triggered
 */
function vibrate(pattern = 10) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
    return true;
  }
  return false;
}

/**
 * Debounce a function
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Check if user is on mobile device
 * @param {number} breakpoint - Breakpoint width (default 768)
 * @returns {boolean}
 */
function isMobile(breakpoint = 768) {
  return window.innerWidth < breakpoint;
}

/**
 * Generate unique ID
 * @param {string} prefix - Optional prefix
 * @returns {string}
 */
function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Deep clone an object
 * @param {*} obj
 * @returns {*}
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Group array items by a key
 * @param {Object[]} array
 * @param {string|Function} key
 * @returns {Object}
 */
function groupBy(array, key) {
  return array.reduce((groups, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    (groups[groupKey] = groups[groupKey] || []).push(item);
    return groups;
  }, {});
}

/**
 * Create SVG element with namespace
 * @param {string} tag - Element tag name
 * @param {Object} attrs - Attributes to set
 * @returns {SVGElement}
 */
function createSVGElement(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
}

/**
 * Animate element with CSS transition
 * @param {HTMLElement} el
 * @param {Object} styles - CSS styles to apply
 * @param {number} duration - Duration in ms
 * @returns {Promise}
 */
function animate(el, styles, duration = 300) {
  return new Promise(resolve => {
    el.style.transition = `all ${duration}ms ease`;
    Object.assign(el.style, styles);
    setTimeout(() => {
      el.style.transition = '';
      resolve();
    }, duration);
  });
}

/**
 * Wait for specified milliseconds
 * @param {number} ms
 * @returns {Promise}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  matchHandle,
  formatMoney,
  vibrate,
  debounce,
  isMobile,
  generateId,
  deepClone,
  groupBy,
  createSVGElement,
  animate,
  sleep
};
