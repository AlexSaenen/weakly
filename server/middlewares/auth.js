/* @flow */
import config from 'config';
import koaJwt from 'koa-jwt';

const makeJwtMiddleware = (secretKey: string) => koaJwt({ secret: secretKey });

const makeDefaultJwtMiddleware = () => {
  const secretKey = config.get('auth.front.secret');
  return makeJwtMiddleware(secretKey);
};

const withJwt = makeDefaultJwtMiddleware();

export {
  makeJwtMiddleware,
  withJwt,
};
