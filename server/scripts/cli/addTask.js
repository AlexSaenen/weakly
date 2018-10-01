/* @flow */
/* eslint-disable no-console */
import chalk from 'chalk';
import inquirer from 'inquirer';
import moment from 'moment';
import datepickerPrompt from 'inquirer-datepicker-prompt';

import { daysOfTheWeek } from 'models/task';
import TaskController, {
  BEGIN_DAY,
  END_DAY,
  TIME_INTERVAL,
} from 'controllers/task';
import { capitalize } from '@/string';

const exitWithError = (error: mixed) => {
  console.error(error);
  console.error('addTask failed to execute');
  process.exit(1);
};

const initialDatetime = new Date();
initialDatetime.setHours(10, 0, 0, 0);

// TODO: more strict date verifications
inquirer.registerPrompt('datetime', datepickerPrompt);
inquirer.prompt([{
  name: 'name',
  message: 'Task name?',
  validate: (answer: string) => {
    if (answer.length) return true;
    return 'Name can not be empty';
  },
}, {
  name: 'notes',
  message: 'Task notes? [optional]',
}, {
  type: 'list',
  name: 'day',
  message: 'Which day of the week?',
  choices: daysOfTheWeek,
}, {
  type: 'datetime',
  name: 'startsAt',
  message: 'Starts at?',
  format: ['hh', ':', 'MM', ' ', 'TT'],
  initial: initialDatetime,
  time: {
    min: "07:00AM",
    max: "11:50PM", // FIXME: make this more centralized
    minutes: {
      interval: TIME_INTERVAL,
    },
  },
}, {
  type: 'datetime',
  name: 'endsAt',
  message: 'Ends at?',
  format: ['hh', ':', 'MM', ' ', 'TT'],
  initial: initialDatetime,
  time: {
    min: "07:05AM",
    max: "11:55PM", // FIXME: make this more centralized
    minutes: {
      interval: TIME_INTERVAL,
    },
  },
}]).then(async (answers) => {
  const { startsAt, endsAt, ...restOfTask } = answers;
  const duration = moment(endsAt).diff(startsAt, 'minutes');
  if (duration <= 0) exitWithError('Task dates seem incorrect');

  const beginOfDay = moment().startOf('day');
  const time = moment(startsAt).diff(beginOfDay, 'minutes');
  await TaskController.createTask({ ...restOfTask, time, duration })
    .catch(exitWithError);

  process.exit(0);
}).catch(exitWithError);
