
export const PRESET_CATEGORIES = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Sports',
  'Technology',
];
 
// ── Normalize user input 
export const normalizeCategory = (val) =>
  val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
 
// ── Check if a category already exists 
export const isDuplicateCategory = (normalized, customCategories) => {
  const lower = normalized.toLowerCase();
  const inPreset = PRESET_CATEGORIES.map((c) => c.toLowerCase()).includes(lower);
  const inCustom = customCategories.map((c) => c.toLowerCase()).includes(lower);
  return inPreset || inCustom;
};
 
// ── Toggle category 
export const getNextCategory = (activeCategory, cat) =>
  activeCategory === cat ? '' : cat;
 