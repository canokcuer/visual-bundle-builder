/**
 * Unit tests for synergy.js
 */
const {
  SYNERGY_MAP,
  SYNERGY_CONNECTIONS,
  getSynergyKey,
  getSynergyConnection,
  getSynergyExplanation,
  getActiveConnections,
  countSynergies,
  getProductInfo
} = require('../../assets/js/bundle-builder/synergy');

describe('Synergy Module', () => {
  describe('SYNERGY_MAP', () => {
    it('should contain all 5 products', () => {
      expect(Object.keys(SYNERGY_MAP)).toHaveLength(5);
      expect(SYNERGY_MAP).toHaveProperty('dreamglow');
      expect(SYNERGY_MAP).toHaveProperty('dailyglow');
      expect(SYNERGY_MAP).toHaveProperty('mindfuel');
      expect(SYNERGY_MAP).toHaveProperty('thechill');
      expect(SYNERGY_MAP).toHaveProperty('reset-button');
    });

    it('should have required properties for each product', () => {
      Object.values(SYNERGY_MAP).forEach(product => {
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('timing');
        expect(product).toHaveProperty('tip');
        expect(product).toHaveProperty('category');
      });
    });

    it('should categorize products correctly', () => {
      expect(SYNERGY_MAP['dreamglow'].category).toBe('night');
      expect(SYNERGY_MAP['dailyglow'].category).toBe('morning');
      expect(SYNERGY_MAP['mindfuel'].category).toBe('morning');
      expect(SYNERGY_MAP['thechill'].category).toBe('night');
      expect(SYNERGY_MAP['reset-button'].category).toBe('noon');
    });
  });

  describe('SYNERGY_CONNECTIONS', () => {
    it('should contain all 10 possible pair combinations', () => {
      // 5 products = 5*4/2 = 10 combinations
      expect(Object.keys(SYNERGY_CONNECTIONS)).toHaveLength(10);
    });

    it('should have required properties for each connection', () => {
      Object.values(SYNERGY_CONNECTIONS).forEach(conn => {
        expect(conn).toHaveProperty('label');
        expect(conn).toHaveProperty('strength');
        expect(conn).toHaveProperty('color');
        expect(['strong', 'medium']).toContain(conn.strength);
        expect(conn.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });
  });

  describe('getSynergyKey', () => {
    it('should create sorted key from two handles', () => {
      expect(getSynergyKey('dreamglow', 'dailyglow')).toBe('dailyglow+dreamglow');
      expect(getSynergyKey('dailyglow', 'dreamglow')).toBe('dailyglow+dreamglow');
    });

    it('should be consistent regardless of order', () => {
      const key1 = getSynergyKey('mindfuel', 'thechill');
      const key2 = getSynergyKey('thechill', 'mindfuel');
      expect(key1).toBe(key2);
    });
  });

  describe('getSynergyConnection', () => {
    it('should return connection for valid pair', () => {
      const conn = getSynergyConnection('dailyglow', 'dreamglow');
      expect(conn).not.toBeNull();
      expect(conn.label).toBe('24 Saat Cilt');
      expect(conn.strength).toBe('strong');
    });

    it('should return same connection regardless of order', () => {
      const conn1 = getSynergyConnection('dailyglow', 'mindfuel');
      const conn2 = getSynergyConnection('mindfuel', 'dailyglow');
      expect(conn1).toEqual(conn2);
    });

    it('should return null for invalid handle', () => {
      const conn = getSynergyConnection('dailyglow', 'invalid');
      expect(conn).toBeNull();
    });
  });

  describe('getSynergyExplanation', () => {
    it('should return explanation for two products', () => {
      const exp = getSynergyExplanation(['dailyglow', 'dreamglow']);
      expect(exp).not.toBeNull();
      expect(exp.title).toBe('7/24 Güzellik Kiti');
      expect(exp).toHaveProperty('benefit');
      expect(exp).toHaveProperty('detail');
    });

    it('should return null for single product', () => {
      const exp = getSynergyExplanation(['dailyglow']);
      expect(exp).toBeNull();
    });

    it('should return null for empty array', () => {
      const exp = getSynergyExplanation([]);
      expect(exp).toBeNull();
    });
  });

  describe('getActiveConnections', () => {
    it('should return empty array for single product', () => {
      const connections = getActiveConnections(['dailyglow']);
      expect(connections).toHaveLength(0);
    });

    it('should return one connection for two products', () => {
      const connections = getActiveConnections(['dailyglow', 'dreamglow']);
      expect(connections).toHaveLength(1);
      expect(connections[0].label).toBe('24 Saat Cilt');
    });

    it('should return three connections for three products', () => {
      const connections = getActiveConnections(['dailyglow', 'dreamglow', 'mindfuel']);
      expect(connections).toHaveLength(3);
    });

    it('should return ten connections for all five products', () => {
      const handles = ['dailyglow', 'dreamglow', 'mindfuel', 'thechill', 'reset-button'];
      const connections = getActiveConnections(handles);
      expect(connections).toHaveLength(10);
    });

    it('should include handle pairs in each connection', () => {
      const connections = getActiveConnections(['dailyglow', 'mindfuel']);
      expect(connections[0].handles).toContain('dailyglow');
      expect(connections[0].handles).toContain('mindfuel');
    });
  });

  describe('countSynergies', () => {
    it('should return 0 for empty array', () => {
      expect(countSynergies([])).toBe(0);
    });

    it('should return 0 for single product', () => {
      expect(countSynergies(['dailyglow'])).toBe(0);
    });

    it('should return 1 for two products', () => {
      expect(countSynergies(['dailyglow', 'dreamglow'])).toBe(1);
    });

    it('should follow combination formula n*(n-1)/2', () => {
      // 3 products = 3 synergies
      expect(countSynergies(['dailyglow', 'dreamglow', 'mindfuel'])).toBe(3);
      // 4 products = 6 synergies
      expect(countSynergies(['dailyglow', 'dreamglow', 'mindfuel', 'thechill'])).toBe(6);
      // 5 products = 10 synergies
      expect(countSynergies(['dailyglow', 'dreamglow', 'mindfuel', 'thechill', 'reset-button'])).toBe(10);
    });
  });

  describe('getProductInfo', () => {
    it('should return product info for valid handle', () => {
      const info = getProductInfo('dreamglow');
      expect(info).not.toBeNull();
      expect(info.name).toBe('DreamGlow');
    });

    it('should return null for invalid handle', () => {
      const info = getProductInfo('invalid');
      expect(info).toBeNull();
    });
  });
});
