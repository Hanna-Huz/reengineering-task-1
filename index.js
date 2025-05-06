const { calculateOrder } = require('./calculateOrder');
const { testCases } = require('./testCases');

testCases.forEach(({ description, input, expected }) => {
  const result = calculateOrder(
    input.language,
    input.startDateTime,
    input.fileFormat,
    input.charCount,
  );

  console.log(description);
  console.log('Input:', JSON.stringify(input));
  console.log('Expected:', expected);
  console.log('Received:', result);
  console.log('✅', JSON.stringify(result) === JSON.stringify(expected));
  console.log('------------------------------------------------------');
});
