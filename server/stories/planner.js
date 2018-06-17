/* @flow */
import db, { Op } from 'database';
import { normalizeString } from '@/intl';
// import * as eventController from 'controllers/event';
import tasks from '../database/tasks.json';

type GetTasksOptions = {
};

export const getTasks = async (options: GetTasksOptions) => {
  const {
  } = options;

  return tasks;
};
