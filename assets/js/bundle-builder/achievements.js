/**
 * Achievement system for the Visual Bundle Builder
 * Handles gamification, unlock logic, and achievement tracking
 */

const ACHIEVEMENTS = {
  'first-step': {
    id: 'first-step',
    title: 'Ilk Adim',
    icon: 'star',
    description: 'Ilk urununu ekledin!',
    condition: (state) => state.items.length >= 1
  },
  'power-duo': {
    id: 'power-duo',
    title: 'Guclu Ikili',
    icon: 'lightning',
    description: 'Iki urun kombinasyonu!',
    condition: (state) => state.items.length >= 2
  },
  'power-morning': {
    id: 'power-morning',
    title: 'Power Morning',
    icon: 'sun',
    description: 'Sabah enerjisi maksimum!',
    condition: (state) => hasProducts(state, ['dailyglow', 'mindfuel'])
  },
  'sleep-beauty': {
    id: 'sleep-beauty',
    title: 'Guzellik Uykusu',
    icon: 'moon',
    description: 'Gece ritueli tamamlandi!',
    condition: (state) => hasProducts(state, ['dreamglow', 'thechill'])
  },
  'full-ritual': {
    id: 'full-ritual',
    title: 'Tam Ritual',
    icon: 'trophy',
    description: 'Tum urunler! %30 indirim kazandin!',
    condition: (state) => state.items.length >= 5
  }
};

/**
 * Helper to normalize product titles to handles
 * @param {string} title
 * @returns {string}
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
 * Check if state contains specific product handles
 * @param {Object} state - State with items array
 * @param {string[]} handles - Required product handles
 * @returns {boolean}
 */
function hasProducts(state, handles) {
  const itemHandles = state.items.map(item => matchHandle(item.title));
  return handles.every(h => itemHandles.includes(h));
}

/**
 * Create initial achievement state
 * @returns {Object}
 */
function createAchievementState() {
  return {
    unlocked: new Set(),
    pending: []
  };
}

/**
 * Check which achievements should be unlocked
 * @param {Object} state - Cart state with items
 * @param {Object} achievementState - Current achievement state
 * @returns {Object[]} Newly unlocked achievements
 */
function checkAchievements(state, achievementState) {
  const newlyUnlocked = [];

  Object.values(ACHIEVEMENTS).forEach(achievement => {
    if (!achievementState.unlocked.has(achievement.id) && achievement.condition(state)) {
      newlyUnlocked.push(achievement);
    }
  });

  return newlyUnlocked;
}

/**
 * Process and unlock achievements
 * @param {Object} state - Cart state
 * @param {Object} achievementState - Achievement state to mutate
 * @returns {Object[]} Newly unlocked achievements
 */
function processAchievements(state, achievementState) {
  const newlyUnlocked = checkAchievements(state, achievementState);

  newlyUnlocked.forEach(achievement => {
    achievementState.unlocked.add(achievement.id);
    achievementState.pending.push(achievement);
  });

  return newlyUnlocked;
}

/**
 * Get next pending achievement notification
 * @param {Object} achievementState
 * @returns {Object|null}
 */
function getNextPendingAchievement(achievementState) {
  return achievementState.pending.shift() || null;
}

/**
 * Calculate achievement progress
 * @param {Object} achievementState
 * @returns {Object} Progress info
 */
function getAchievementProgress(achievementState) {
  const total = Object.keys(ACHIEVEMENTS).length;
  const unlocked = achievementState.unlocked.size;
  return {
    unlocked,
    total,
    percent: Math.round((unlocked / total) * 100),
    remaining: total - unlocked
  };
}

/**
 * Get achievement by ID
 * @param {string} id
 * @returns {Object|null}
 */
function getAchievement(id) {
  return ACHIEVEMENTS[id] || null;
}

/**
 * Get all achievements with their unlock status
 * @param {Object} achievementState
 * @returns {Object[]}
 */
function getAllAchievements(achievementState) {
  return Object.values(ACHIEVEMENTS).map(achievement => ({
    ...achievement,
    isUnlocked: achievementState.unlocked.has(achievement.id)
  }));
}

/**
 * Reset achievement state (for testing)
 * @param {Object} achievementState
 */
function resetAchievements(achievementState) {
  achievementState.unlocked.clear();
  achievementState.pending = [];
}

module.exports = {
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
};
