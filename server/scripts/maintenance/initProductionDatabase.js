/* @flow */
/* eslint-disable no-console */
import db, {
  startClient,
  closeClient,
} from 'db';

startClient(db)
  .then(() => db.sync({ force: true }))
  .catch((databaseError) => {
    console.error(databaseError);
    throw new Error('initDatabase failed to execute');
  })
  .finally(() => closeClient(db));
