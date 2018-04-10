import React from 'react';
import Wrapper from './Wrapper';
import Task from 'components/Task';

export default function Tasks({ tasks }) {
  return (
    <Wrapper>
      {tasks.map(task => <Task key={task.id} task={task} />)}
    </Wrapper>
  );
};
