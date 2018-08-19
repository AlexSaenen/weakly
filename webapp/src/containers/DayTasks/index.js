// @flow

import { connect } from 'react-redux';

import TasksList from 'components/TasksList';
import type { Task } from 'ducks/schemas';

import {
  getTasks,
} from './selectors';

const mapStateToProps = (state, ownProps) => ({
  tasks: getTasks(state, ownProps),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
