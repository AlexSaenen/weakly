import React from 'react';

import TaskItem, { type Task } from 'components/TaskItem';

import Wrapper from './Wrapper';

export type Tasks = Array<Task>;

type Props = {
  +tasks: Tasks
};

export default function TasksList({ tasks }: Props) {
  console.log('TasksList.render()');
  return (
    <Wrapper>
      {tasks.map((task: Task) => <TaskItem key={task.id} task={task} />)}
    </Wrapper>
  );
};
