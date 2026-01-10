/**
 * Unit tests for pricing.js
 */
const {
  SYNERGY_CONFIG,
  getTier,
  getItemDiscountRate,
  getTotalQuantity,
  calculatePricing,
  formatMoney,
  calculateSavings,
  getNextTier
} = require('../../assets/js/bundle-builder/pricing');

describe('Pricing Module', () => {
  describe('SYNERGY_CONFIG', () => {
    it('should have 5 tiers', () => {
      expect(Object.keys(SYNERGY_CONFIG)).toHaveLength(5);
    });

    it('should have increasing discount rates', () => {
      expect(SYNERGY_CONFIG[1].discount).toBe(0);
      expect(SYNERGY_CONFIG[2].discount).toBe(0.15);
      expect(SYNERGY_CONFIG[3].discount).toBe(0.20);
      expect(SYNERGY_CONFIG[4].discount).toBe(0.25);
      expect(SYNERGY_CONFIG[5].discount).toBe(0.30);
    });

    it('should have increasing progress percentages', () => {
      expect(SYNERGY_CONFIG[1].percent).toBe(20);
      expect(SYNERGY_CONFIG[2].percent).toBe(40);
      expect(SYNERGY_CONFIG[3].percent).toBe(60);
      expect(SYNERGY_CONFIG[4].percent).toBe(80);
      expect(SYNERGY_CONFIG[5].percent).toBe(100);
    });
  });

  describe('getTier', () => {
    it('should return base tier for 0 quantity', () => {
      const tier = getTier(0);
      expect(tier.percent).toBe(0);
      expect(tier.text).toBe('Başlayın');
      expect(tier.discount).toBe(0);
    });

    it('should return correct tier for each quantity', () => {
      expect(getTier(1).discount).toBe(0);
      expect(getTier(2).discount).toBe(0.15);
      expect(getTier(3).discount).toBe(0.20);
      expect(getTier(4).discount).toBe(0.25);
      expect(getTier(5).discount).toBe(0.30);
    });

    it('should cap at tier 5 for quantities over 5', () => {
      expect(getTier(6)).toEqual(SYNERGY_CONFIG[5]);
      expect(getTier(10)).toEqual(SYNERGY_CONFIG[5]);
      expect(getTier(100)).toEqual(SYNERGY_CONFIG[5]);
    });

    it('should handle negative quantities', () => {
      const tier = getTier(-1);
      expect(tier.percent).toBe(0);
    });
  });

  describe('getItemDiscountRate', () => {
    it('should return 35% for 6+ items', () => {
      expect(getItemDiscountRate(6, 0.15)).toBe(0.35);
      expect(getItemDiscountRate(10, 0.30)).toBe(0.35);
    });

    it('should return 30% for 3-5 items', () => {
      expect(getItemDiscountRate(3, 0.15)).toBe(0.30);
      expect(getItemDiscountRate(4, 0.20)).toBe(0.30);
      expect(getItemDiscountRate(5, 0.25)).toBe(0.30);
    });

    it('should return bundle rate for 1-2 items', () => {
      expect(getItemDiscountRate(1, 0.15)).toBe(0.15);
      expect(getItemDiscountRate(2, 0.20)).toBe(0.20);
    });
  });

  describe('getTotalQuantity', () => {
    it('should return 0 for empty array', () => {
      expect(getTotalQuantity([])).toBe(0);
    });

    it('should sum quantities correctly', () => {
      const items = [
        { quantity: 1 },
        { quantity: 2 },
        { quantity: 3 }
      ];
      expect(getTotalQuantity(items)).toBe(6);
    });

    it('should default to 1 if quantity not specified', () => {
      const items = [
        { price: 100 },
        { price: 200, quantity: 2 }
      ];
      expect(getTotalQuantity(items)).toBe(3);
    });
  });

  describe('calculatePricing', () => {
    it('should return zeros for empty cart', () => {
      const result = calculatePricing([]);
      expect(result.subtotal).toBe(0);
      expect(result.discount).toBe(0);
      expect(result.total).toBe(0);
    });

    it('should calculate correctly for single item with no discount', () => {
      const items = [{ price: 10000, quantity: 1 }]; // 100 TL
      const result = calculatePricing(items);
      expect(result.subtotal).toBe(10000);
      expect(result.discount).toBe(0); // tier 1 = 0% discount
      expect(result.total).toBe(10000);
    });

    it('should apply 15% discount for 2 items', () => {
      const items = [
        { price: 10000, quantity: 1 },
        { price: 10000, quantity: 1 }
      ];
      const result = calculatePricing(items);
      expect(result.subtotal).toBe(20000);
      expect(result.discount).toBe(3000); // 15% of 20000
      expect(result.total).toBe(17000);
    });

    it('should apply 30% discount for 5 items', () => {
      const items = [
        { price: 10000, quantity: 1 },
        { price: 10000, quantity: 1 },
        { price: 10000, quantity: 1 },
        { price: 10000, quantity: 1 },
        { price: 10000, quantity: 1 }
      ];
      const result = calculatePricing(items);
      expect(result.subtotal).toBe(50000);
      expect(result.discount).toBe(15000); // 30% of 50000
      expect(result.total).toBe(35000);
    });

    it('should apply quantity discount for 3+ of same item', () => {
      const items = [{ price: 10000, quantity: 3 }];
      const result = calculatePricing(items);
      expect(result.subtotal).toBe(30000);
      // 3 items of same product = 30% discount (quantity discount > bundle discount)
      expect(result.discount).toBe(9000);
      expect(result.total).toBe(21000);
    });

    it('should apply 35% quantity discount for 6+ of same item', () => {
      const items = [{ price: 10000, quantity: 6 }];
      const result = calculatePricing(items);
      expect(result.subtotal).toBe(60000);
      expect(result.discount).toBe(21000); // 35% of 60000
      expect(result.total).toBe(39000);
    });

    it('should include tier info in result', () => {
      const items = [
        { price: 10000, quantity: 1 },
        { price: 10000, quantity: 1 }
      ];
      const result = calculatePricing(items);
      expect(result.tier).toBeDefined();
      expect(result.tier.discount).toBe(0.15);
      expect(result.totalQuantity).toBe(2);
    });

    it('should calculate discount percent correctly', () => {
      const items = [
        { price: 10000, quantity: 1 },
        { price: 10000, quantity: 1 }
      ];
      const result = calculatePricing(items);
      expect(result.discountPercent).toBe(15);
    });
  });

  describe('formatMoney', () => {
    it('should format cents to TRY', () => {
      const formatted = formatMoney(10000);
      expect(formatted).toContain('100');
      // Turkish Lira symbol can be TL or ₺ depending on locale
      expect(formatted.includes('TL') || formatted.includes('₺')).toBe(true);
    });

    it('should handle zero', () => {
      const formatted = formatMoney(0);
      expect(formatted).toContain('0');
    });

    it('should not show decimal places', () => {
      const formatted = formatMoney(10050);
      // Should show 100 or 101, not 100.50
      expect(formatted).not.toContain(',50');
      expect(formatted).not.toContain('.50');
    });
  });

  describe('calculateSavings', () => {
    it('should return 0 for empty cart', () => {
      expect(calculateSavings([])).toBe(0);
    });

    it('should return discount amount', () => {
      const items = [
        { price: 10000, quantity: 1 },
        { price: 10000, quantity: 1 }
      ];
      expect(calculateSavings(items)).toBe(3000);
    });
  });

  describe('getNextTier', () => {
    it('should return next tier info', () => {
      const result = getNextTier(1);
      expect(result).not.toBeNull();
      expect(result.nextTier.discount).toBe(0.15);
      expect(result.productsNeeded).toBe(1);
    });

    it('should return null when at max tier', () => {
      expect(getNextTier(5)).toBeNull();
      expect(getNextTier(10)).toBeNull();
    });

    it('should calculate products needed correctly', () => {
      expect(getNextTier(0).productsNeeded).toBe(1);
      expect(getNextTier(1).productsNeeded).toBe(1);
      expect(getNextTier(2).productsNeeded).toBe(1);
    });
  });
});
