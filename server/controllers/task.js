/* @flow */

import db from 'db';
import { createModelFetcher } from 'db/helpers';
import type { Model } from 'sequelize';

const modelFetcher = createModelFetcher(db, 'Task');
export default modelFetcher;

export type Task = {
  name: string,
  notes: string,
  day: string,
  time: number,
  duration: number,
};

export type TaskInstance = Model<Task>;
