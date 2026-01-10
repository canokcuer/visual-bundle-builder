/**
 * Synergy logic for the Visual Bundle Builder
 * Handles product synergies and connection calculations
 */

const SYNERGY_MAP = {
  'dreamglow': { name: 'DreamGlow', timing: 'Uykudan 45 dk önce', tip: '1 ölçek tozu ılık suyla karıştırın.', category: 'night' },
  'dailyglow': { name: 'DailyGlow', timing: 'Kahvaltı sonrası', tip: 'Tok karnına 1 kapsül. Işıltı içeriden başlar.', category: 'morning' },
  'mindfuel': { name: 'MindFuel', timing: 'Kahvaltı sonrası', tip: 'Tok karnına alın. Kahveden etkili odaklanma.', category: 'morning' },
  'thechill': { name: 'TheChill', timing: 'Akşam yemeği sonrası', tip: 'Uykudan 1-2 saat önce gevşemek için.', category: 'night' },
  'reset-button': { name: 'Reset Button', timing: 'Öğle yemeği sonrası', tip: 'Bol su ile tok karnına.', category: 'noon' }
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
  'dailyglow+dreamglow': { title: '7/24 Güzellik Kiti', benefit: 'Kesintisiz cilt onarımı', detail: 'Gündüz cildinizi koruyun, gece uykuda onarın.' },
  'dailyglow+mindfuel': { title: 'Power Morning', benefit: 'Enerji + Odaklanma', detail: 'Hem fiziksel ışıltı hem zihinsel netlik.' },
  'dailyglow+reset-button': { title: 'Detox & Glow', benefit: 'Arınma + Canlılık', detail: 'İçeriden temizlenin, dışarıya ışık saçın.' },
  'dailyglow+thechill': { title: 'Denge Paketi', benefit: 'Sabah Enerjisi, Akşam Huzuru', detail: 'Modern hayatın panzehiri.' },
  'dreamglow+mindfuel': { title: 'Smart & Beautiful', benefit: 'Gündüz Odak, Gece Bakım', detail: 'Ne görünümünüzden ne başarınızdan ödün vermeyin.' },
  'dreamglow+reset-button': { title: 'Gece Terapisi', benefit: 'Arınma + Yenilenme', detail: 'Siz uyurken bedeniniz toksinleri atsın.' },
  'dreamglow+thechill': { title: 'Uyku Ritüeli', benefit: 'Derin Uyku + Onarım', detail: 'TheChill zihni susturur, DreamGlow bedeni onarır.' },
  'mindfuel+reset-button': { title: 'Berrak Zihin', benefit: 'Toksin Atımı + Konsantrasyon', detail: 'Beyin sisine son. Arınmış metabolizma ile performans.' },
  'mindfuel+thechill': { title: 'Zen Performans', benefit: 'Kontrollü Güç', detail: 'Stres yapmadan odaklanın.' },
  'reset-button+thechill': { title: 'Tam Reset', benefit: 'Zihinsel & Bedensel Arınma', detail: 'Fabrika Ayarlarına Dönüş.' }
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
