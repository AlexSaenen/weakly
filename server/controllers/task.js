/* @flow */

import db from 'db';
import { createModelFetcher } from 'db/helpers';

import { type Task } from './task.types';
export * from './task.types';

const model = createModelFetcher(db, 'Task');

export const TIME_INTERVAL = 5; // minutes
export const BEGIN_DAY = 7 * 60; // 07:00 AM
export const END_DAY = (24 * 60) - 1; // 11:59 PM

const validateTime = (time: number) => {
  if (time < BEGIN_DAY) return false;
  if (time > END_DAY) return false;
  if (time % TIME_INTERVAL !== 0) return false;
  return true;
};

/* TODO: write tests for this function */
const createTask = (task: Task) => {
  const { time: begin } = task;
  const end = begin + task.duration;

  if (validateTime(begin) === false) {
    throw new Error('Invalid task begin time');
  }

  if (validateTime(end) === false) {
    throw new Error('Invalid task duration');
  }

  return model().create(task);
};

export default {
  validateTime,
  createTask,
  model,
};
