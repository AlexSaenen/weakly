/* @flow */
/* eslint-disable no-console */
import db, {
  startClient,
  closeClient,
} from 'db';

import initDevDatabase from './temporaryDevDatabase';

startClient(db)
  .then(() => db.sync({ force: true }))
  .then(() => initDevDatabase())
  .catch((databaseError) => {
    console.error(databaseError);
    throw new Error('initDatabase failed to execute');
  })
  .finally(() => closeClient(db));
