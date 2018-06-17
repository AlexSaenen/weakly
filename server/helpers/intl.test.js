import { normalizeString, removeDiacritics } from './intl';

const diacriticalString = 'iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ';
const nonDiacriticalString = 'internationalizati0n';

test('removeDiacritics', () => {
  const string = removeDiacritics(diacriticalString);
  expect(string).toBe(nonDiacriticalString);
});

describe('normalizeString', () => {
  test('diacritics are removed', () => {
    const string = normalizeString(diacriticalString);
    expect(string).toBe(nonDiacriticalString);
  });

  test('trims the string', () => {
    expect(normalizeString('  hello  ')).toBe('hello');
  });

  test('makes the string lowercase', () => {
    expect(normalizeString('HeLlO')).toBe('hello');
  });

  test('replaces multiple non padding spaces by a single _', () => {
    expect(normalizeString('hello world')).toBe('hello_world');
    expect(normalizeString('hello   world')).toBe('hello_world');
    expect(normalizeString('   hello   world    ')).toBe('hello_world');
  });

  test('final example: "BTS - Wörld Toùr Bjørk" becomes "bts_-_world_tour"', () => {
    expect(normalizeString('BTS - Wörld Toùr Bjørk')).toBe('bts_-_world_tour_bjork');
  });
});
