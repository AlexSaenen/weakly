/* @flow */
import TaskController from 'controllers/task';
import tasks from 'fixtures/tasks.json';

export const initTasks = async (amountOfTasks?: number) => {
  const pendingCreators = tasks
    .slice(0, amountOfTasks)
    .map(task => TaskController.createTask(task));

  await Promise.all(pendingCreators);
};
