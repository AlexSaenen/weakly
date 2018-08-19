/* @flow */

export type Noop = <T>(T) => T;
const noop: Noop = <T>(arg: T): T => arg;

const add = (left: number, right: number): number => left + right;

const concat = <T>(left: Array<T>, right: Array<T>): Array<T> => left.concat(right);

export default {
  noop,
  add,
  concat,
};
