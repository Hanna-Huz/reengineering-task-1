const FILE_FORMATS = ['doc', 'docx', 'rtf'];
const NON_STANDARD_FORMAT_SURCHARGE = 1.2;
const FIXED_TIME = 30;
const MIN_PROCESSING_TIME = 60;
const LANGUAGE_CONFIG = {
  uk: { pricePerChar: 0.05, minPrice: 50, speed: 1333 },
  en: { pricePerChar: 0.12, minPrice: 120, speed: 333 },
};

module.exports = {
  FILE_FORMATS,
  NON_STANDARD_FORMAT_SURCHARGE,
  FIXED_TIME,
  MIN_PROCESSING_TIME,
  LANGUAGE_CONFIG,
};
