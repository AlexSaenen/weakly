/* @flow */
import { remove as removeDiacritics } from 'diacritics';

const normalizeString = (string: string) =>
  removeDiacritics(string)
    .toLowerCase()
    .replace(/[^a-z-\d\s]+/g, '')
    .trim()
    .replace(/\s+/g, '_');

export { normalizeString, removeDiacritics };
