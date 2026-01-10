/**
 * Unit tests for achievements.js
 */
const {
  ACHIEVEMENTS,
  matchHandle,
  hasProducts,
  createAchievementState,
  checkAchievements,
  processAchievements,
  getNextPendingAchievement,
  getAchievementProgress,
  getAchievement,
  getAllAchievements,
  resetAchievements
} = require('../../assets/js/bundle-builder/achievements');

describe('Achievements Module', () => {
  describe('ACHIEVEMENTS', () => {
    it('should have 5 achievements', () => {
      expect(Object.keys(ACHIEVEMENTS)).toHaveLength(5);
    });

    it('should have required properties for each achievement', () => {
      Object.values(ACHIEVEMENTS).forEach(achievement => {
        expect(achievement).toHaveProperty('id');
        expect(achievement).toHaveProperty('title');
        expect(achievement).toHaveProperty('icon');
        expect(achievement).toHaveProperty('description');
        expect(achievement).toHaveProperty('condition');
        expect(typeof achievement.condition).toBe('function');
      });
    });

    it('should include expected achievements', () => {
      expect(ACHIEVEMENTS).toHaveProperty('first-step');
      expect(ACHIEVEMENTS).toHaveProperty('power-duo');
      expect(ACHIEVEMENTS).toHaveProperty('power-morning');
      expect(ACHIEVEMENTS).toHaveProperty('sleep-beauty');
      expect(ACHIEVEMENTS).toHaveProperty('full-ritual');
    });
  });

  describe('matchHandle', () => {
    it('should match product titles to handles', () => {
      expect(matchHandle('DreamGlow')).toBe('dreamglow');
      expect(matchHandle('DailyGlow')).toBe('dailyglow');
      expect(matchHandle('MindFuel')).toBe('mindfuel');
      expect(matchHandle('TheChill')).toBe('thechill');
      expect(matchHandle('Reset Button')).toBe('reset-button');
    });

    it('should handle case variations', () => {
      expect(matchHandle('DREAMGLOW')).toBe('dreamglow');
      expect(matchHandle('dreamglow')).toBe('dreamglow');
      expect(matchHandle('Dream Glow')).toBe('dreamglow');
    });

    it('should handle special characters', () => {
      expect(matchHandle('Dream-Glow!')).toBe('dreamglow');
      expect(matchHandle('Mind_Fuel')).toBe('mindfuel');
    });

    it('should return normalized string for unknown products', () => {
      expect(matchHandle('Unknown Product')).toBe('unknownproduct');
    });
  });

  describe('hasProducts', () => {
    it('should return true when all products are present', () => {
      const state = {
        items: [
          { title: 'DailyGlow' },
          { title: 'MindFuel' }
        ]
      };
      expect(hasProducts(state, ['dailyglow', 'mindfuel'])).toBe(true);
    });

    it('should return false when products are missing', () => {
      const state = {
        items: [{ title: 'DailyGlow' }]
      };
      expect(hasProducts(state, ['dailyglow', 'mindfuel'])).toBe(false);
    });

    it('should return true for empty required handles', () => {
      const state = { items: [] };
      expect(hasProducts(state, [])).toBe(true);
    });
  });

  describe('createAchievementState', () => {
    it('should create empty state', () => {
      const state = createAchievementState();
      expect(state.unlocked).toBeInstanceOf(Set);
      expect(state.unlocked.size).toBe(0);
      expect(state.pending).toEqual([]);
    });
  });

  describe('checkAchievements', () => {
    let achievementState;

    beforeEach(() => {
      achievementState = createAchievementState();
    });

    it('should return first-step for 1 item', () => {
      const state = { items: [{ title: 'DailyGlow' }] };
      const unlocked = checkAchievements(state, achievementState);
      expect(unlocked.some(a => a.id === 'first-step')).toBe(true);
    });

    it('should return power-duo for 2 items', () => {
      const state = {
        items: [
          { title: 'DailyGlow' },
          { title: 'DreamGlow' }
        ]
      };
      const unlocked = checkAchievements(state, achievementState);
      expect(unlocked.some(a => a.id === 'power-duo')).toBe(true);
    });

    it('should return power-morning for DailyGlow + MindFuel', () => {
      const state = {
        items: [
          { title: 'DailyGlow' },
          { title: 'MindFuel' }
        ]
      };
      const unlocked = checkAchievements(state, achievementState);
      expect(unlocked.some(a => a.id === 'power-morning')).toBe(true);
    });

    it('should return sleep-beauty for DreamGlow + TheChill', () => {
      const state = {
        items: [
          { title: 'DreamGlow' },
          { title: 'TheChill' }
        ]
      };
      const unlocked = checkAchievements(state, achievementState);
      expect(unlocked.some(a => a.id === 'sleep-beauty')).toBe(true);
    });

    it('should return full-ritual for 5 items', () => {
      const state = {
        items: [
          { title: 'DailyGlow' },
          { title: 'DreamGlow' },
          { title: 'MindFuel' },
          { title: 'TheChill' },
          { title: 'Reset Button' }
        ]
      };
      const unlocked = checkAchievements(state, achievementState);
      expect(unlocked.some(a => a.id === 'full-ritual')).toBe(true);
    });

    it('should not return already unlocked achievements', () => {
      const state = { items: [{ title: 'DailyGlow' }] };
      achievementState.unlocked.add('first-step');
      const unlocked = checkAchievements(state, achievementState);
      expect(unlocked.some(a => a.id === 'first-step')).toBe(false);
    });

    it('should return empty array for no items', () => {
      const state = { items: [] };
      const unlocked = checkAchievements(state, achievementState);
      expect(unlocked).toHaveLength(0);
    });
  });

  describe('processAchievements', () => {
    let achievementState;

    beforeEach(() => {
      achievementState = createAchievementState();
    });

    it('should add to unlocked set', () => {
      const state = { items: [{ title: 'DailyGlow' }] };
      processAchievements(state, achievementState);
      expect(achievementState.unlocked.has('first-step')).toBe(true);
    });

    it('should add to pending queue', () => {
      const state = { items: [{ title: 'DailyGlow' }] };
      processAchievements(state, achievementState);
      expect(achievementState.pending.length).toBeGreaterThan(0);
    });

    it('should return newly unlocked achievements', () => {
      const state = { items: [{ title: 'DailyGlow' }] };
      const unlocked = processAchievements(state, achievementState);
      expect(unlocked.some(a => a.id === 'first-step')).toBe(true);
    });

    it('should not duplicate achievements', () => {
      const state = { items: [{ title: 'DailyGlow' }] };
      processAchievements(state, achievementState);
      processAchievements(state, achievementState);
      expect(achievementState.unlocked.size).toBe(1);
    });
  });

  describe('getNextPendingAchievement', () => {
    it('should return and remove first pending achievement', () => {
      const achievementState = {
        unlocked: new Set(),
        pending: [ACHIEVEMENTS['first-step'], ACHIEVEMENTS['power-duo']]
      };

      const first = getNextPendingAchievement(achievementState);
      expect(first.id).toBe('first-step');
      expect(achievementState.pending).toHaveLength(1);

      const second = getNextPendingAchievement(achievementState);
      expect(second.id).toBe('power-duo');
      expect(achievementState.pending).toHaveLength(0);
    });

    it('should return null when queue is empty', () => {
      const achievementState = { unlocked: new Set(), pending: [] };
      expect(getNextPendingAchievement(achievementState)).toBeNull();
    });
  });

  describe('getAchievementProgress', () => {
    it('should return 0% for no unlocked achievements', () => {
      const achievementState = { unlocked: new Set(), pending: [] };
      const progress = getAchievementProgress(achievementState);
      expect(progress.unlocked).toBe(0);
      expect(progress.total).toBe(5);
      expect(progress.percent).toBe(0);
      expect(progress.remaining).toBe(5);
    });

    it('should calculate progress correctly', () => {
      const achievementState = {
        unlocked: new Set(['first-step', 'power-duo']),
        pending: []
      };
      const progress = getAchievementProgress(achievementState);
      expect(progress.unlocked).toBe(2);
      expect(progress.percent).toBe(40);
      expect(progress.remaining).toBe(3);
    });

    it('should return 100% when all unlocked', () => {
      const achievementState = {
        unlocked: new Set(Object.keys(ACHIEVEMENTS)),
        pending: []
      };
      const progress = getAchievementProgress(achievementState);
      expect(progress.percent).toBe(100);
      expect(progress.remaining).toBe(0);
    });
  });

  describe('getAchievement', () => {
    it('should return achievement by ID', () => {
      const achievement = getAchievement('first-step');
      expect(achievement).not.toBeNull();
      expect(achievement.title).toBe('İlk Adım');
    });

    it('should return null for invalid ID', () => {
      expect(getAchievement('invalid')).toBeNull();
    });
  });

  describe('getAllAchievements', () => {
    it('should return all achievements with unlock status', () => {
      const achievementState = {
        unlocked: new Set(['first-step']),
        pending: []
      };
      const all = getAllAchievements(achievementState);
      expect(all).toHaveLength(5);

      const firstStep = all.find(a => a.id === 'first-step');
      expect(firstStep.isUnlocked).toBe(true);

      const powerDuo = all.find(a => a.id === 'power-duo');
      expect(powerDuo.isUnlocked).toBe(false);
    });
  });

  describe('resetAchievements', () => {
    it('should clear unlocked set and pending queue', () => {
      const achievementState = {
        unlocked: new Set(['first-step', 'power-duo']),
        pending: [ACHIEVEMENTS['full-ritual']]
      };
      resetAchievements(achievementState);
      expect(achievementState.unlocked.size).toBe(0);
      expect(achievementState.pending).toHaveLength(0);
    });
  });
});
