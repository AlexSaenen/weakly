// @flow

import type { RawTask, Task } from 'components/TaskItem';
import type { Tasks } from 'components/TasksList';

import tasksJSON from './__tasks__.temporary.json';
/* TODO: this json comes from the store with a reselect
  https://github.com/reactjs/reselect */

export type State = {
  +tasks: Tasks,
};

export type Action = {
  +type: string,
};

const getInitialState = (): State => {
  /* TODO: this right here is normalizr's job
  https://github.com/paularmstrong/normalizr */
  const makeTask = (task: RawTask, index: number): Task => ({ ...task, id: index });
  const tasks: Tasks = tasksJSON.map(makeTask);
  return { tasks };
};

const planner = (state: State = getInitialState(), action: Action): State => {
  return state; // TODO: a switch on the action
};

export default planner;
