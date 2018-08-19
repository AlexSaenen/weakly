import * as string from '@/string';
import { isString } from '@/type';

describe('capitalize()', () => {
  const { capitalize } = string;

  it('returns a string', () => {
    const returnValue = capitalize('something');
    expect(isString(returnValue)).toBeTruthy();
  });

  it('returns an empty string when given nothing', () => {
    expect(capitalize('')).toBe('');
    expect(capitalize()).toBe('');
  });

  it('capitalizes the first letter of the string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('changes nothing if already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('does not change case of other letters', () => {
    expect(capitalize('HELLO')).toBe('HELLO');
    expect(capitalize('hELLO')).toBe('HELLO');
  });
});
