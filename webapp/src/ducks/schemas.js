/* @flow */

import { normalize, schema } from 'normalizr';

const taskSchema = new schema.Entity('tasks', {}, {
  processStrategy: (entity) => ({
    ...entity,
    day: entity.day.toLowerCase(),
  }),
});
const tasksSchema = [taskSchema];

export type Task = {
  +id: number,
  +name: string,
  +notes: string,
  +day: string,
  +time: number,
  +duration: number,
};

export type Tasks = [Task];

export const normalizeTasks = (tasks: Tasks) => normalize(tasks, tasksSchema);
