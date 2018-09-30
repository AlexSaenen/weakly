/* @flow */
/* eslint-disable no-console */
import db, {
  startClient,
  closeClient,
} from 'db';

import { insertTasks } from './initializeFixtures';

startClient(db)
  .then(() => db.sync({ force: true }))
  .then(() => insertTasks())
  .catch((databaseError) => {
    console.error(databaseError);
    throw new Error('initializeDatabase failed to execute');
  })
  .finally(() => closeClient(db));
