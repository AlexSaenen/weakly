// @flow

// import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import planner, { getTasks } from './planner';

// export const rootEpic = combineEpics(
//   pingEpic,
//   fetchUserEpic
// );
export const rootEpic = getTasks;
export const rootReducer = combineReducers({
  planner,
});
