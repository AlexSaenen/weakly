// @flow

// import { combineEpics } from 'redux-observable';
// import { combineReducers } from 'redux';

import tasks, { getTasks } from './tasks';

// export const rootEpic = combineEpics(
//   pingEpic,
//   fetchUserEpic
// );
export const rootEpic = getTasks;
// export const rootReducer = combineReducers({
//   ping,
//   users
// });
export const rootReducer = tasks;
