// @flow

import { createStore } from 'redux';
import plannerReducer from 'containers/Planner/reducer';

const store = createStore(plannerReducer);

export default store;
