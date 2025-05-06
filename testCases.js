const testCases = [
  {
    description: 'Перехід без переходу днів (стандартна ситуація)',
    input: {
      language: 'uk',
      startDateTime: new Date('2025-04-28 10:00'),
      fileFormat: 'doc',
      charCount: 1333,
    },
    expected: { deadline: '28.04.25 11:30', price: '66.65 грн', totalTime: '90 хв' },
  },
  {
    description: 'Перехід через вечір (після 19:00)',
    input: {
      language: 'uk',
      startDateTime: new Date('2025-04-28 18:30'),
      fileFormat: 'doc',
      charCount: 1333,
    },
    expected: { deadline: '29.04.25 11:00', price: '66.65 грн', totalTime: '90 хв' },
  },
  {
    description: 'Перехід через вихідні',
    input: {
      language: 'uk',
      startDateTime: new Date('2025-05-02 18:30'),
      fileFormat: 'doc',
      charCount: 1333,
    },
    expected: { deadline: '05.05.25 11:00', price: '66.65 грн', totalTime: '90 хв' },
  },
  {
    description: 'Старт поза робочими годинами (до 10:00)',
    input: {
      language: 'uk',
      startDateTime: new Date('2025-04-28 08:00'),
      fileFormat: 'doc',
      charCount: 1333,
    },
    expected: { deadline: '28.04.25 11:30', price: '66.65 грн', totalTime: '90 хв' },
  },
  {
    description: 'Старт у вихідний день (неділя)',
    input: {
      language: 'uk',
      startDateTime: new Date('2025-05-04 14:00'),
      fileFormat: 'doc',
      charCount: 1333,
    },
    expected: { deadline: '05.05.25 11:30', price: '66.65 грн', totalTime: '90 хв' },
  },
  {
    description: 'Нетиповий формат файлу (pdf)',
    input: {
      language: 'uk',
      startDateTime: new Date('2025-04-28 10:00'),
      fileFormat: 'pdf',
      charCount: 1333,
    },
    expected: { deadline: '28.04.25 11:48', price: '79.98 грн', totalTime: '108 хв' },
  },
  {
    description: 'Стандартна ситуація для англійської (без переходу днів)',
    input: {
      language: 'en',
      startDateTime: new Date('2025-04-28 10:00'),
      fileFormat: 'doc',
      charCount: 1333,
    },
    expected: { deadline: '28.04.25 14:30', price: '159.96 грн', totalTime: '270 хв' },
  },
  {
    description: 'Перехід через вечір для англійської (після 19:00)',
    input: {
      language: 'en',
      startDateTime: new Date('2025-04-28 18:30'),
      fileFormat: 'doc',
      charCount: 1333,
    },
    expected: { deadline: '29.04.25 14:00', price: '159.96 грн', totalTime: '270 хв' },
  },
  {
    description: 'Перехід через вихідні для англійської',
    input: {
      language: 'en',
      startDateTime: new Date('2025-05-02 18:30'),
      fileFormat: 'doc',
      charCount: 1333,
    },
    expected: { deadline: '05.05.25 14:00', price: '159.96 грн', totalTime: '270 хв' },
  },
  {
    description: 'Нетиповий формат файлу (pdf) для англійської',
    input: {
      language: 'en',
      startDateTime: new Date('2025-04-28 10:00'),
      fileFormat: 'pdf',
      charCount: 1333,
    },
    expected: { deadline: '28.04.25 15:24', price: '191.95 грн', totalTime: '324 хв' },
  },
  {
    description: 'Малий обсяг тексту для англійської (1000 знаків)',
    input: {
      language: 'en',
      startDateTime: new Date('2025-04-28 10:00'),
      fileFormat: 'doc',
      charCount: 1000,
    },
    expected: { deadline: '28.04.25 13:30', price: '120.00 грн', totalTime: '210 хв' },
  },
  {
    description: 'Великий обсяг тексту для англійської (5000 знаків)',
    input: {
      language: 'en',
      startDateTime: new Date('2025-04-28 10:00'),
      fileFormat: 'doc',
      charCount: 5000,
    },
    expected: { deadline: '29.04.25 16:31', price: '600.00 грн', totalTime: '931 хв' },
  },
];

module.exports = { testCases };
