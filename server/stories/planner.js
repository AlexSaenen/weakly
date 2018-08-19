/* @flow */
import alertModel from 'controllers/task';

type GetTasksOptions = {
};

export const getTasks = async (options: GetTasksOptions) => {
  const {
  } = options;

  const tasks = await alertModel().findAll({});

  return tasks;
};

export const createTask = task =>
  alertModel().create(task);
