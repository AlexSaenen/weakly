import * as date from '@/date';

describe('time units with milliseconds as reference', () => {
  const {
    millisecond,
    second,
    minute,
    hour,
    day,
  } = date;

  test('50 * millisecond equals 50', () => {
    expect(50 * millisecond).toBe(50);
  });

  test('10 * second equals 10 000', () => {
    expect(10 * second).toBe(10000);
  });

  test('2 * minute equals 120 000', () => {
    expect(2 * minute).toBe(120000);
  });

  test('1 * hour equals 3 600 000', () => {
    expect(1 * hour).toBe(3600000);
  });

  test('2 * day equals 172 800 000', () => {
    expect(2 * day).toBe(172800000);
  });
});

describe('regex to validate a time string hh:mm:ss', () => {
  const { timeStringRegex } = date;

  test('20:00:00 matches', () => {
    const timeString = '20:00:00';
    expect(timeStringRegex.test(timeString)).toBeTruthy();
  });

  test('24:00:00 fails', () => {
    const timeString = '24:00:00';
    expect(timeStringRegex.test(timeString)).toBeFalsy();
  });

  test('23:59:0 fails', () => {
    const timeString = '23:59:0';
    expect(timeStringRegex.test(timeString)).toBeFalsy();
  });

  test('23:61:00 fails', () => {
    const timeString = '23:61:00';
    expect(timeStringRegex.test(timeString)).toBeFalsy();
  });
});
