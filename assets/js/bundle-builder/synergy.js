/**
 * Synergy logic for the Visual Bundle Builder
 * Handles product synergies and connection calculations
 */

const SYNERGY_MAP = {
  'dreamglow': { name: 'DreamGlow', timing: 'Uykudan 45 dk once', tip: '1 olcek tozu ilik suyla karistirin.', category: 'night' },
  'dailyglow': { name: 'DailyGlow', timing: 'Kahvalti sonrasi', tip: 'Tok karnina 1 kapsul. Isilti iceriden baslar.', category: 'morning' },
  'mindfuel': { name: 'MindFuel', timing: 'Kahvalti sonrasi', tip: 'Tok karnina alin. Kahveden etkili odaklanma.', category: 'morning' },
  'thechill': { name: 'TheChill', timing: 'Aksam yemegi sonrasi', tip: 'Uykudan 1-2 saat once gevsemek icin.', category: 'night' },
  'reset-button': { name: 'Reset Button', timing: 'Ogle yemegi sonrasi', tip: 'Bol su ile tok karnina.', category: 'noon' }
};

const SYNERGY_CONNECTIONS = {
  'dailyglow+dreamglow': { label: '24 Saat Cilt', strength: 'strong', color: '#8B5CF6' },
  'dailyglow+mindfuel': { label: 'Power Morning', strength: 'strong', color: '#3B82F6' },
  'dailyglow+reset-button': { label: 'Detox & Glow', strength: 'medium', color: '#10B981' },
  'dailyglow+thechill': { label: 'Denge Paketi', strength: 'medium', color: '#6366F1' },
  'dreamglow+mindfuel': { label: 'Smart Beauty', strength: 'medium', color: '#EC4899' },
  'dreamglow+reset-button': { label: 'Gece Terapisi', strength: 'medium', color: '#8B5CF6' },
  'dreamglow+thechill': { label: 'Uyku Ritueli', strength: 'strong', color: '#6366F1' },
  'mindfuel+reset-button': { label: 'Berrak Zihin', strength: 'medium', color: '#14B8A6' },
  'mindfuel+thechill': { label: 'Zen Performans', strength: 'strong', color: '#10B981' },
  'reset-button+thechill': { label: 'Tam Reset', strength: 'medium', color: '#F59E0B' }
};

const SYNERGY_EXPLANATIONS = {
  'dailyglow+dreamglow': { title: '7/24 Guzellik Kiti', benefit: 'Kesintisiz cilt onarimi', detail: 'Gunduz cildinizi koruyun, gece uykuda onarin.' },
  'dailyglow+mindfuel': { title: 'Power Morning', benefit: 'Enerji + Odaklanma', detail: 'Hem fiziksel isilti hem zihinsel netlik.' },
  'dailyglow+reset-button': { title: 'Detox & Glow', benefit: 'Arinma + Canlilik', detail: 'Iceriden temizlenin, disariya isik sacin.' },
  'dailyglow+thechill': { title: 'Denge Paketi', benefit: 'Sabah Enerjisi, Aksam Huzuru', detail: 'Modern hayatin panzehiri.' },
  'dreamglow+mindfuel': { title: 'Smart & Beautiful', benefit: 'Gunduz Odak, Gece Bakim', detail: 'Ne gorunumunuzden ne basarinizdan odun vermeyin.' },
  'dreamglow+reset-button': { title: 'Gece Terapisi', benefit: 'Arinma + Yenilenme', detail: 'Siz uyurken bedeniniz toksinleri atsin.' },
  'dreamglow+thechill': { title: 'Uyku Ritueli', benefit: 'Derin Uyku + Onarim', detail: 'TheChill zihni susturur, DreamGlow bedeni onarir.' },
  'mindfuel+reset-button': { title: 'Berrak Zihin', benefit: 'Toksin Atimi + Konsantrasyon', detail: 'Beyin sisine son. Arinmis metabolizma ile performans.' },
  'mindfuel+thechill': { title: 'Zen Performans', benefit: 'Kontrollu Guc', detail: 'Stres yapmadan odaklanin.' },
  'reset-button+thechill': { title: 'Tam Reset', benefit: 'Zihinsel & Bedensel Arinma', detail: 'Fabrika Ayarlarina Donus.' }
};

/**
 * Generate a canonical synergy key from two product handles
 * @param {string} handle1
 * @param {string} handle2
 * @returns {string} Sorted key like "dailyglow+dreamglow"
 */
function getSynergyKey(handle1, handle2) {
  return [handle1, handle2].sort().join('+');
}

/**
 * Get synergy connection between two products
 * @param {string} handle1
 * @param {string} handle2
 * @returns {Object|null} Synergy connection data or null
 */
function getSynergyConnection(handle1, handle2) {
  const key = getSynergyKey(handle1, handle2);
  return SYNERGY_CONNECTIONS[key] || null;
}

/**
 * Get synergy explanation for a combination
 * @param {string[]} handles - Array of product handles
 * @returns {Object|null} Synergy explanation or null
 */
function getSynergyExplanation(handles) {
  if (handles.length < 2) return null;

  // Try exact match first (for 2+ product combinations)
  const sortedKey = [...handles].sort().join('+');
  if (SYNERGY_EXPLANATIONS[sortedKey]) {
    return SYNERGY_EXPLANATIONS[sortedKey];
  }

  // Fall back to first pair
  const key = getSynergyKey(handles[0], handles[1]);
  return SYNERGY_EXPLANATIONS[key] || null;
}

/**
 * Get all active synergy connections for selected products
 * @param {string[]} handles - Array of selected product handles
 * @returns {Object[]} Array of connection objects with from/to coordinates
 */
function getActiveConnections(handles) {
  const connections = [];
  for (let i = 0; i < handles.length; i++) {
    for (let j = i + 1; j < handles.length; j++) {
      const conn = getSynergyConnection(handles[i], handles[j]);
      if (conn) {
        connections.push({
          ...conn,
          handles: [handles[i], handles[j]]
        });
      }
    }
  }
  return connections;
}

/**
 * Count total synergies for selected products
 * @param {string[]} handles
 * @returns {number}
 */
function countSynergies(handles) {
  return getActiveConnections(handles).length;
}

/**
 * Get product info from synergy map
 * @param {string} handle
 * @returns {Object|null}
 */
function getProductInfo(handle) {
  return SYNERGY_MAP[handle] || null;
}

module.exports = {
  SYNERGY_MAP,
  SYNERGY_CONNECTIONS,
  SYNERGY_EXPLANATIONS,
  getSynergyKey,
  getSynergyConnection,
  getSynergyExplanation,
  getActiveConnections,
  countSynergies,
  getProductInfo
};
