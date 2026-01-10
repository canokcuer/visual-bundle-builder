/**
 * Pricing logic for the Visual Bundle Builder
 * Handles discount calculations and tier-based pricing
 */

const SYNERGY_CONFIG = {
  1: { percent: 20, text: 'Başlangıç', discount: 0 },
  2: { percent: 40, text: '%15 İkili Güç', discount: 0.15 },
  3: { percent: 60, text: '%20 Popüler', discount: 0.20 },
  4: { percent: 80, text: '%25 Pro', discount: 0.25 },
  5: { percent: 100, text: '%30 Efsane', discount: 0.30 }
};

// Quantity-based discount rates
const QUANTITY_DISCOUNTS = {
  6: 0.35, // 6+ of same product = 35% off
  3: 0.30  // 3-5 of same product = 30% off
};

/**
 * Get the discount tier for a given quantity
 * @param {number} quantity - Total quantity of products
 * @returns {Object} Tier config with percent, text, and discount rate
 */
function getTier(quantity) {
  const tier = Math.min(Math.max(quantity, 0), 5);
  return tier > 0 ? SYNERGY_CONFIG[tier] : { percent: 0, text: 'Başlayın', discount: 0 };
}

/**
 * Get the discount rate for a single item based on its quantity
 * @param {number} itemQuantity - Quantity of a single item
 * @param {number} bundleRate - Bundle discount rate
 * @returns {number} Discount rate to apply
 */
function getItemDiscountRate(itemQuantity, bundleRate) {
  if (itemQuantity >= 6) return QUANTITY_DISCOUNTS[6];
  if (itemQuantity >= 3) return QUANTITY_DISCOUNTS[3];
  return bundleRate;
}

/**
 * Calculate total quantity from items array
 * @param {Object[]} items - Array of cart items with quantity property
 * @returns {number} Total quantity
 */
function getTotalQuantity(items) {
  return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

/**
 * Calculate pricing for a cart
 * @param {Object[]} items - Array of cart items with price and quantity
 * @returns {Object} Pricing breakdown with subtotal, discount, and total
 */
function calculatePricing(items) {
  const totalQty = getTotalQuantity(items);
  const tier = getTier(totalQty);
  const bundleRate = tier.discount;

  let subtotal = 0;
  let totalDiscount = 0;

  items.forEach(item => {
    const qty = item.quantity || 1;
    const itemSubtotal = item.price * qty;
    subtotal += itemSubtotal;

    const rate = getItemDiscountRate(qty, bundleRate);
    totalDiscount += Math.round(itemSubtotal * rate);
  });

  return {
    subtotal,
    discount: totalDiscount,
    total: subtotal - totalDiscount,
    tier,
    totalQuantity: totalQty,
    discountPercent: subtotal > 0 ? Math.round((totalDiscount / subtotal) * 100) : 0
  };
}

/**
 * Format price in Turkish Lira
 * @param {number} cents - Price in cents/kurus
 * @returns {string} Formatted price string
 */
function formatMoney(cents) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0
  }).format(cents / 100);
}

/**
 * Calculate savings amount
 * @param {Object[]} items
 * @returns {number} Total savings in cents
 */
function calculateSavings(items) {
  const { discount } = calculatePricing(items);
  return discount;
}

/**
 * Get the next tier info for upselling
 * @param {number} currentQuantity
 * @returns {Object|null} Next tier info or null if at max
 */
function getNextTier(currentQuantity) {
  const currentTierNum = Math.min(currentQuantity, 5);
  const nextTierNum = currentTierNum + 1;

  if (nextTierNum > 5) return null;

  return {
    currentTier: SYNERGY_CONFIG[currentTierNum] || { percent: 0, text: 'Başlayın', discount: 0 },
    nextTier: SYNERGY_CONFIG[nextTierNum],
    productsNeeded: nextTierNum - currentQuantity
  };
}

module.exports = {
  SYNERGY_CONFIG,
  QUANTITY_DISCOUNTS,
  getTier,
  getItemDiscountRate,
  getTotalQuantity,
  calculatePricing,
  formatMoney,
  calculateSavings,
  getNextTier
};
