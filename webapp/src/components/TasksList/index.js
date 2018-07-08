// @flow

import React from 'react';
import type { Map } from 'immutable';

import TaskItem from 'components/TaskItem';
import type { Task } from 'ducks/schemas';

import Wrapper from './Wrapper';

type Props = {
  +tasks: Map<Task>,
};

function TasksList({ tasks }: Props) {
  console.log('TasksList.render()');
  return (
    <Wrapper>
      {tasks.map((task) => <TaskItem key={task.get('id')} task={task} />)}
    </Wrapper>
  );
};

export default TasksList;
