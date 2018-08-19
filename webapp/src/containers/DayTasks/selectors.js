// @flow

import { createSelector } from 'reselect';

const getResult = state => state.planner.get('result');
const getTasksFromPlanner = state => state.planner.getIn(['entities', 'tasks']);
const getNormalizedDay = (_, props) => props.day.toLowerCase();

export const getTasks = createSelector(
  getResult,
  getTasksFromPlanner,
  getNormalizedDay,
  (result, tasks, normalizedDay) => {
    return (result
      .filter((idTask) => {
        const task = tasks.get(idTask.toString());
        const taskDay = task.get('day');
        return taskDay === normalizedDay;
      })
      .map((idTask) => {
        const task = tasks.get(idTask.toString());
        return task;
      }));
  },
);
