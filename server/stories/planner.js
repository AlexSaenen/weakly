/* @flow */
import TaskController, { type Task } from 'controllers/task';

type GetTasksOptions = {
};

export const getTasks = async (options: GetTasksOptions) => {
  const {
  } = options;

  const tasks = await TaskController.model().findAll({});

  return tasks;
};
