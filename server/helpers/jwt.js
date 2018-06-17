/* @flow */
import jwt from 'jsonwebtoken';
import config from 'config';

import { hour } from './date';

type jwtPayload = {
  email: string,
};

const generateJwt = (payload: jwtPayload): string => {
  const secretKey = config.get('auth.front.secret');

  const jwtOptions = {
    algorithm: 'HS256',
    expiresIn: 18 * hour,
  };

  const token = jwt.sign(payload, secretKey, jwtOptions);
  return token;
};

const decodeJwt = (token: string): jwtPayload => {
  const tokenPayload = jwt.decode(token);
  return tokenPayload;
};

export {
  generateJwt,
  decodeJwt,
};
