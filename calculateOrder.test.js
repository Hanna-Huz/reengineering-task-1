const { calculateOrder } = require('./calculateOrder');

describe('calculateOrder', () => {
  test('should calculate price and deadline for small text (uk, doc format, below minimum)', () => {
    const result = calculateOrder('uk', new Date('2025-04-28 10:00'), 'doc', 10);

    expect(result).toEqual({
      deadline: '28.04.25 11:00',
      price: '50.00 грн',
      totalTime: '60 хв',
    });
  });

  test('should calculate price and deadline for large text (uk, doc format, above minimum)', () => {
    const result = calculateOrder('uk', new Date('2025-04-28 10:00'), 'doc', 5000);

    expect(result).toEqual({
      deadline: '28.04.25 14:15',
      price: '250.00 грн',
      totalTime: '255 хв',
    });
  });

  test('should calculate for non-standard file format (pdf)', () => {
    const result = calculateOrder('uk', new Date('2025-04-28 10:00'), 'pdf', 5000);

    expect(result).toEqual({
      deadline: '28.04.25 15:06',
      price: '300.00 грн',
      totalTime: '306 хв',
    });
  });

  test('should handle order within working hours (uk, doc format)', () => {
    const result = calculateOrder('uk', new Date('2025-04-28 10:00'), 'doc', 2000);

    expect(result).toEqual({
      deadline: '28.04.25 12:00',
      price: '100.00 грн',
      totalTime: '120 хв',
    });
  });

  test('should handle order outside working hours (after 19:00, uk, doc format)', () => {
    const result = calculateOrder('uk', new Date('2025-04-28 18:30'), 'doc', 2000);

    expect(result).toEqual({
      deadline: '29.04.25 11:30',
      price: '100.00 грн',
      totalTime: '120 хв',
    });
  });

  test('should handle order across weekend (friday to monday)', () => {
    const result = calculateOrder('uk', new Date('2025-05-02 18:30'), 'doc', 5000);

    expect(result).toEqual({
      deadline: '05.05.25 13:45',
      price: '250.00 грн',
      totalTime: '255 хв',
    });
  });

  test('should calculate price and deadline for English text (en, doc format)', () => {
    const result = calculateOrder('en', new Date('2025-04-28 10:00'), 'doc', 5000);

    expect(result).toEqual({
      deadline: '29.04.25 16:31',
      price: '600.00 грн',
      totalTime: '931 хв',
    });
  });

  test('should calculate price and deadline for English text (en, pdf format)', () => {
    const result = calculateOrder('en', new Date('2025-04-28 10:00'), 'pdf', 5000);

    expect(result).toEqual({
      deadline: '30.04.25 10:37',
      price: '720.00 грн',
      totalTime: '1117 хв',
    });
  });

  test('should calculate price and deadline for small English text (1000 characters)', () => {
    const result = calculateOrder('en', new Date('2025-04-28 10:00'), 'doc', 1000);

    expect(result).toEqual({
      deadline: '28.04.25 13:30',
      price: '120.00 грн',
      totalTime: '210 хв',
    });
  });

  test('should handle order across weekend (friday to monday, en, doc format)', () => {
    const result = calculateOrder('en', new Date('2025-05-02 18:30'), 'doc', 1333);

    expect(result).toEqual({
      deadline: '05.05.25 14:00',
      price: '159.96 грн',
      totalTime: '270 хв',
    });
  });
});
