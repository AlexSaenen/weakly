/* @flow */
import config from 'config';
import { Client } from 'pg';

const [
  databaseName,
  username,
  password,
  options,
] = [
  config.get('postgres.database'),
  config.get('postgres.username'),
  config.get('postgres.password'),
  config.get('postgres.options'),
];

const postgresOptions = {
  user: username,
  password,
  host: options.host,
  port: options.port,
};

const createDatabaseClient = (_database: string) =>
  new Client({
    ...postgresOptions,
    database: _database,
  });

const connectToDatabase = (_database: string) => {
  const client = createDatabaseClient(_database);
  const giveClient = () => client;
  return client
    .connect()
    .then(giveClient);
};

const start = () => connectToDatabase(databaseName);
const closeClient = (client: any) => client.end();

export {
  connectToDatabase,
  start,
  closeClient,
  databaseName,
};
