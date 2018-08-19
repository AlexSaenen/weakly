import * as types from '@/type';
/* eslint-disable prefer-arrow-callback */

describe('isBoolean', () => {
  const { isBoolean } = types;

  test('is a function', () => {
    expect(typeof isBoolean).toBe('function');
  });

  test('isBoolean(null) returns boolean', () => {
    expect(typeof isBoolean(null)).toBe('boolean');
  });

  test('isBoolean(null) returns false', () => {
    expect(isBoolean(null)).toBe(false);
  });

  test('isBoolean(\'\') returns false', () => {
    expect(isBoolean('')).toBe(false);
  });

  test('isBoolean(1) returns false', () => {
    expect(isBoolean(1)).toBe(false);
  });

  test('isBoolean(0) returns false', () => {
    expect(isBoolean(0)).toBe(false);
  });

  test('isBoolean(\'hello\') returns false', () => {
    expect(isBoolean('hello')).toBe(false);
  });

  test('isBoolean(false) returns true', () => {
    expect(isBoolean(false)).toBe(true);
  });
});

describe('isString', () => {
  const { isString } = types;

  test('is a function', () => {
    expect(typeof isString).toBe('function');
  });

  test('isString(null) returns boolean', () => {
    expect(typeof isString(null)).toBe('boolean');
  });

  test('isString(null) returns false', () => {
    expect(isString(null)).toBe(false);
  });

  test('isString(\'\') returns true', () => {
    expect(isString('')).toBe(true);
  });

  test('isString(\'hello\') returns true', () => {
    expect(isString('hello')).toBe(true);
  });

  test('isString(false) returns false', () => {
    expect(isString(false)).toBe(false);
  });
});

describe('isNumber', () => {
  const { isNumber } = types;

  test('is a function', () => {
    expect(typeof isNumber).toBe('function');
  });

  test('isNumber(null) returns boolean', () => {
    expect(typeof isNumber(null)).toBe('boolean');
  });

  test('isNumber(null) returns false', () => {
    expect(isNumber(null)).toBe(false);
  });

  test('isNumber(0) returns true', () => {
    expect(isNumber(0)).toBe(true);
  });

  test('isNumber(\'42\') returns false', () => {
    expect(isNumber('42')).toBe(false);
  });

  test('isNumber(false) returns false', () => {
    expect(isNumber(false)).toBe(false);
  });

  test('isNumber(Number.NaN) returns true', () => {
    expect(isNumber(Number.NaN)).toBe(true);
  });

  test('isNumber(43.5) returns true', () => {
    expect(isNumber(43.5)).toBe(true);
  });
});

describe('isFunction', () => {
  const { isFunction } = types;

  test('is a function', () => {
    expect(typeof isFunction).toBe('function');
  });

  test('isFunction(null) returns boolean', () => {
    expect(typeof isFunction(null)).toBe('boolean');
  });

  test('isFunction(null) returns false', () => {
    expect(isFunction(null)).toBe(false);
  });

  test('isFunction(() => {}) returns true', () => {
    expect(isFunction(() => {})).toBe(true);
  });

  test('isFunction(function test() {}) returns true', () => {
    expect(isFunction(function test() {})).toBe(true);
  });
});

describe('isObject', () => {
  const { isObject } = types;

  test('is a function', () => {
    expect(typeof isObject).toBe('function');
  });

  test('isObject(null) returns boolean', () => {
    expect(typeof isObject(null)).toBe('boolean');
  });

  test('isObject(null) returns false', () => {
    expect(isObject(null)).toBe(false);
  });

  test('isObject({}) returns true', () => {
    expect(isObject({})).toBe(true);
  });

  test('isObject(undefined) returns false', () => {
    expect(isObject(undefined)).toBe(false);
  });

  test('isObject(\'\') returns false', () => {
    expect(isObject('')).toBe(false);
  });
});

describe('isDefined', () => {
  const { isDefined } = types;

  test('is a function', () => {
    expect(typeof isDefined).toBe('function');
  });

  test('isDefined(null) returns boolean', () => {
    expect(typeof isDefined(null)).toBe('boolean');
  });

  test('isDefined(null) returns false', () => {
    expect(isDefined(null)).toBe(false);
  });

  test('isDefined({}) returns true', () => {
    expect(isDefined({})).toBe(true);
  });

  test('isDefined(undefined) returns false', () => {
    expect(isDefined(undefined)).toBe(false);
  });

  test('isDefined(\'\') returns true', () => {
    expect(isDefined('')).toBe(true);
  });

  test('isDefined(42) returns true', () => {
    expect(isDefined(42)).toBe(true);
  });

  test('isDefined([]) returns true', () => {
    expect(isDefined([])).toBe(true);
  });
});

describe('isDate', () => {
  const { isDate } = types;
  // isDate only serves to indicate if the entity is an instance of Date()

  test('is a function', () => {
    expect(typeof isDate).toBe('function');
  });

  test('isDate(null) returns boolean', () => {
    expect(typeof isDate(null)).toBe('boolean');
  });

  test('isDate(null) returns false', () => {
    expect(isDate(null)).toBe(false);
  });

  test('isDate(Date.now()) returns false', () => {
    expect(isDate(Date.now())).toBe(false);
  });

  test('isDate({}) returns false', () => {
    expect(isDate({})).toBe(false);
  });

  test('isDate(new Date()) returns true', () => {
    expect(isDate(new Date())).toBe(true);
  });

  test('isDate(\'2018-07-12\') returns false', () => {
    expect(isDate('2018-07-12')).toBe(false);
  });
});

describe('castBooleanFields', () => {
  const { castBooleanFields } = types;

  test('it throws an error if fields parameter is not an array', () => {
    const initialObject = { something: 'true', anotherField: false };
    expect(() => castBooleanFields({}, initialObject)).toThrowError();
    expect(() => castBooleanFields(undefined, initialObject)).toThrowError();
    expect(() => castBooleanFields(null, initialObject)).toThrowError();
    expect(() => castBooleanFields('12', initialObject)).toThrowError();
    expect(() => castBooleanFields(42, initialObject)).toThrowError();
    expect(() => castBooleanFields([], initialObject)).not.toThrow();
  });

  test('it throws an error if fields parameter contains invalid keys', () => {
    const initialObject = { something: 'true', anotherField: false };
    expect(() => castBooleanFields([], initialObject)).not.toThrow();
    expect(() => castBooleanFields([12], initialObject)).toThrowError();
    expect(() => castBooleanFields([null, 'anotherField'], initialObject)).toThrowError();
    expect(() => castBooleanFields(['something'], initialObject)).not.toThrow();
    expect(() => castBooleanFields(['something', 'anotherField'], initialObject)).not.toThrow();
  });

  test('it returns an object with the same fields', () => {
    const initialObject = { something: 'true', anotherField: false };
    const castObject = castBooleanFields([], initialObject);
    const initialFields = Object.keys(initialObject);
    const newFields = Object.keys(castObject);
    expect(initialFields).toEqual(newFields);
  });

  test('it throws an error if target fields are not Booleanish values', () => {
    const initialObject = {
      something: 'hello',
      working: 'true',
      also: false,
      anotherField: 'false',
      notWorking: 42,
    };

    expect(() => castBooleanFields(['something'], initialObject)).toThrowError();
    expect(() => castBooleanFields(['notWorking'], initialObject)).toThrowError();
    expect(() => castBooleanFields(['working', 'also', 'anotherField'], initialObject)).not.toThrow();
  });

  test('it returns an object with target fields cast to Boolean', () => {
    const initialObject = {
      isActive: 'false',
      isSource: 'true',
      isNothing: true,
      isSpecial: false,
    };

    let castObject;

    castObject = castBooleanFields(['isActive'], initialObject);
    expect(castObject).toEqual({ ...initialObject, isActive: false });
    castObject = castBooleanFields(['isActive', 'isSpecial'], initialObject);
    expect(castObject).toEqual({ ...initialObject, isActive: false });
    castObject = castBooleanFields([
      'isActive',
      'isSpecial',
      'isNothing',
      'isSource',
    ], initialObject);
    expect(castObject).toEqual({
      ...initialObject,
      isActive: false,
      isSource: true,
    });
  });
});
