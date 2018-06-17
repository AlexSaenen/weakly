/* @flow */
import { remove as removeDiacritics } from 'diacritics';

// TODO: also replace the quotes
const normalizeString = (string: string) =>
  removeDiacritics(string)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_');

export { normalizeString, removeDiacritics };
