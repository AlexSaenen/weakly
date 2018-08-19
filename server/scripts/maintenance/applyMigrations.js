/* @flow */
/* eslint-disable no-console */
import Umzug from 'umzug';
import chalk from 'chalk';
import db, {
  startClient,
  closeClient,
  Sequelize,
} from 'db';

const logMigrationEvents = (migrationClient) => {
  migrationClient
    .on('migrating', (_migration: string) =>
      console.log(chalk`{blue Applying} migration: {inverse ${_migration}}`))
    .on('migrated', (_migration: string) =>
      console.log(chalk`{green Successfully} applied migration: {inverse ${_migration}}`))
    .on('reverting', (_migration: string) =>
      console.log(chalk`{blue Reverting} migration: {inverse ${_migration}}`))
    .on('reverted', (_migration: string) =>
      console.log(chalk`{green Successfully} reverted migration: {inverse ${_migration}}`));
};

startClient(db)
  .then(() => {
    const queryInterface = db.getQueryInterface();
    const { models } = db;

    const migrationClient = new Umzug({
      db,
      migrations: {
        path: 'database/migrations',
        pattern: /^\d+\.\d+\.js$/, // 1.0.js
        params: [queryInterface, Sequelize, models],
      },
    });

    logMigrationEvents(migrationClient);

    /* in most cases, we want to apply with "up()" all migrations "from" a certain start version,
      most likely the last migration file added. When reverting migrations, use "down()" and change
      "from" to "to" - https://github.com/sequelize/umzug#executing-pending-migrations */
    return migrationClient.up({ from: 0 });
  })
  .catch((databaseError) => {
    console.error(databaseError);
    throw new Error('applyMigrations failed to execute');
  })
  .finally(() => closeClient(db));
