/* @flow */
import { createTask } from 'stories/planner';
import tasks from 'fixtures/tasks.json';

export default async (amountOfTasks?: number) => {
  const pendingCreators = tasks
    .slice(0, amountOfTasks)
    .map(task => createTask(task));

  await Promise.all(pendingCreators);
};
