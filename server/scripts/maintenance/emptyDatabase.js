/* @flow */
/* eslint-disable no-console */
import {
  start as connectToTargetDatabase,
  closeClient,
  databaseName,
} from 'database/native';

const refuseFurtherConnections = 'REVOKE ALL PRIVILEGES ON SCHEMA pg_catalog FROM "public";';
const killOtherConnections = `
  SELECT pg_terminate_backend(pg_stat_activity.pid) \
  FROM pg_stat_activity \
  WHERE pg_stat_activity.datname = '${databaseName}'
  AND pid <> pg_backend_pid();`;
const dropPublicSchema = 'DROP SCHEMA IF EXISTS "public" CASCADE;';
const recreatePublicSchema = 'CREATE SCHEMA "public";';

const disconnectFromOutsideWorld = () =>
  connectToTargetDatabase().then(client =>
    Promise.resolve()
      .then(() => client.query(refuseFurtherConnections))
      .then(() => client.query(killOtherConnections))
      .catch(() => console.log('We also kicked ourselves out'))
      .finally(() => closeClient(client)));

const emptyTargetDatabase = () =>
  connectToTargetDatabase().then(client =>
    Promise.resolve()
      .then(() => client.query(dropPublicSchema))
      .then(() => client.query(recreatePublicSchema))
      .finally(() => closeClient(client)));

Promise.resolve()
  .then(disconnectFromOutsideWorld)
  .then(emptyTargetDatabase)
  .catch((databaseError) => {
    console.error(databaseError);
    throw new Error('emptyDatabase failed to execute');
  });
