// @flow

import { fromJS, type Iterable } from 'immutable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import {
  normalizeTasks,
  type Tasks,
} from './schemas';

export type State = Iterable;

export type Action = {
  +type: string,
  +tasks: Tasks,
};

const FETCH = 'weakly/tasks/GET';
const FETCH_FAIL = 'weakly/tasks/GET_FAIL';
const FETCH_OK = 'weakly/tasks/GET_OK';

const initialState = fromJS({
  entities: {
    tasks: {},
  },
  result: [],
});

const tasksReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FETCH_OK: {
      const { tasks } = action;
      const normalizedData = normalizeTasks(tasks);
      return state.mergeDeep(normalizedData);
    }
    default:
      return state;
  }
};

export const loadTasks = () => ({ type: FETCH });
export const loadTasksFail = (error: string) => ({ type: FETCH_FAIL, error });
export const loadTasksOk = (tasks: Tasks) => ({ type: FETCH_OK, tasks });

export const getTasks = (action$) =>
  action$.pipe(
    ofType(FETCH),
    mergeMap(action =>
      ajax.getJSON('http://dev.l0cal:3003/v1/front/tasks').pipe(
        map(response => loadTasksOk(response)),
        catchError(error => of({
          type: FETCH_FAIL,
          error: error.xhr.response,
        })),
      ))
    );

export default tasksReducer;
