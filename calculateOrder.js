const {
  FILE_FORMATS,
  NON_STANDARD_FORMAT_SURCHARGE,
  FIXED_TIME,
  MIN_PROCESSING_TIME,
  LANGUAGE_CONFIG,
} = require('./config/constants');
const { validateInput, calculateDeadline } = require('./utils/dateUtils');

function calculatePrice(language, fileFormat, charCount) {
  const { pricePerChar, minPrice } = LANGUAGE_CONFIG[language];
  let price = charCount * pricePerChar;

  if (!FILE_FORMATS.includes(fileFormat)) {
    price *= NON_STANDARD_FORMAT_SURCHARGE;
  }

  return Math.max(price, minPrice);
}

function calculateProcessingTime(language, fileFormat, charCount) {
  const { speed } = LANGUAGE_CONFIG[language];
  let totalTime = FIXED_TIME + (charCount / speed) * 60;

  if (!FILE_FORMATS.includes(fileFormat)) {
    totalTime *= NON_STANDARD_FORMAT_SURCHARGE;
  }

  return Math.round(Math.max(totalTime, MIN_PROCESSING_TIME));
}

function calculateOrder(language, startDateTime, fileFormat, charCount) {
  validateInput(language, startDateTime);

  const price = calculatePrice(language, fileFormat, charCount);
  const processingTime = calculateProcessingTime(language, fileFormat, charCount);
  const deadline = calculateDeadline(startDateTime, processingTime);

  return {
    deadline,
    price: `${price.toFixed(2)} грн`,
    totalTime: `${processingTime} хв`,
  };
}

module.exports = { calculateOrder };
