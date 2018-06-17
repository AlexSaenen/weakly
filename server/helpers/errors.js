/* @flow */
import chalk from 'chalk';

/* AuthentificationError
To be used when an attempt was made to authenticate but failed */
class AuthentificationError extends Error {
  constructor(reason: string) {
    super(chalk`{red We could not authenticate the user}: ${reason}`);
    Error.captureStackTrace(this, AuthentificationError);
  }
}

/* ValidationError
To be used in an assert situation */
class ValidationError extends Error {
  constructor(validator: string, reason: string) {
    super(chalk`{red ${validator}() validation failed}: ${reason}`);
    Error.captureStackTrace(this, ValidationError);
  }
}

export {
  AuthentificationError,
  ValidationError,
};
