/* @flow */
const isInstance = (type: any) =>
  (entity: any) => entity instanceof type;
const isType = (type: any) =>
  (entity: any) => typeof entity === type; // eslint-disable-line valid-typeof

export const isString = isType('string');
export const isNumber = isType('number');
export const isBoolean = isType('boolean');
export const isFunction = isType('function');
export const isObject = (entity: Object) => (entity !== null && isType('object')(entity));
export const isDate = isInstance(Date);

export const isDefined = (entity: any) => (entity !== null && entity !== undefined);

export const castBooleanFields = (fields: Array<string>, object: Object): Object => {
  if (Array.isArray(fields) === false) {
    throw new Error('expected fields to be an array');
  }

  const isArrayOfStrings = fields.every(isString);
  if (isArrayOfStrings === false) {
    throw new Error('expected fields to be an array of strings');
  }

  const booleanValues = ['true', 'false'];

  const castToBooleanIfRequired = (field, value) => {
    const shouldCast = fields.includes(field) && isBoolean(value) === false;
    const isBooleanish = booleanValues.includes(value);
    if (shouldCast && isBooleanish === false) {
      throw new Error('tried to cast a non Booleanish value');
    }

    const castEntry = { [field]: (value === 'true') };
    const originalEntry = { [field]: value };
    return (shouldCast ? castEntry : originalEntry);
  };

  const castObject = Object
    .entries(object)
    .reduce((_object, [field, value]) => ({
      ..._object,
      ...castToBooleanIfRequired(field, value),
    }), {});

  return castObject;
};
