/**
 * Bundle Builder Module
 * Main entry point for testable bundle builder logic
 */

const synergy = require('./synergy');
const pricing = require('./pricing');
const achievements = require('./achievements');
const utils = require('./utils');

module.exports = {
  // Synergy exports
  SYNERGY_MAP: synergy.SYNERGY_MAP,
  SYNERGY_CONNECTIONS: synergy.SYNERGY_CONNECTIONS,
  SYNERGY_EXPLANATIONS: synergy.SYNERGY_EXPLANATIONS,
  getSynergyKey: synergy.getSynergyKey,
  getSynergyConnection: synergy.getSynergyConnection,
  getSynergyExplanation: synergy.getSynergyExplanation,
  getActiveConnections: synergy.getActiveConnections,
  countSynergies: synergy.countSynergies,
  getProductInfo: synergy.getProductInfo,

  // Pricing exports
  SYNERGY_CONFIG: pricing.SYNERGY_CONFIG,
  QUANTITY_DISCOUNTS: pricing.QUANTITY_DISCOUNTS,
  getTier: pricing.getTier,
  getItemDiscountRate: pricing.getItemDiscountRate,
  getTotalQuantity: pricing.getTotalQuantity,
  calculatePricing: pricing.calculatePricing,
  formatMoney: pricing.formatMoney,
  calculateSavings: pricing.calculateSavings,
  getNextTier: pricing.getNextTier,

  // Achievement exports
  ACHIEVEMENTS: achievements.ACHIEVEMENTS,
  matchHandle: achievements.matchHandle,
  hasProducts: achievements.hasProducts,
  createAchievementState: achievements.createAchievementState,
  checkAchievements: achievements.checkAchievements,
  processAchievements: achievements.processAchievements,
  getNextPendingAchievement: achievements.getNextPendingAchievement,
  getAchievementProgress: achievements.getAchievementProgress,
  getAchievement: achievements.getAchievement,
  getAllAchievements: achievements.getAllAchievements,
  resetAchievements: achievements.resetAchievements,

  // Utility exports
  vibrate: utils.vibrate,
  debounce: utils.debounce,
  isMobile: utils.isMobile,
  generateId: utils.generateId,
  deepClone: utils.deepClone,
  groupBy: utils.groupBy,
  createSVGElement: utils.createSVGElement,
  animate: utils.animate,
  sleep: utils.sleep
};
