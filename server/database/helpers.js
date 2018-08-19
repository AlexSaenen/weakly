/* @flow */
import config from 'config';
import chalk from 'chalk';
import { ValidationError } from 'sequelize';
import { isDefined } from '@/type';

export const createModelFetcher = (db: Object, modelName: string) =>
  () => db.models[modelName];

export const makeReadOnly = (fieldName: string) =>
  /* we do not use an arrow function, otherwise
    we lose the bound sequelize document instance */
  function readOnly(val: any) {
    const currentValue = this.getDataValue(fieldName);
    if (isDefined(currentValue)) {
      throw new ValidationError('Can not set a readOnly field that has already been set');
    }

    this.setDataValue(fieldName, val);
  };

// FIXME: is this really necessary ? check if jest always overrides NODE_ENV
export const assertTestEnvironment = () => {
  const nodeEnv = config.util.getEnv('NODE_ENV');
  const isTesting = nodeEnv === 'test';

  if (isTesting === false) {
    const reason = `
We wipe the database clean during tests. This is currently not
a "test" environment and thus the target database is not the test
instance, which we consider a mistake and dangerous`;

    const criticalUserMistake = chalk`{red CRITICAL}: ${reason}`;
    throw new Error(criticalUserMistake);
  }
};
