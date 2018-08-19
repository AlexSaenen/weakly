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

type NativeClient = any;

const createDatabaseClient = (_database: string): NativeClient =>
  new Client({
    ...postgresOptions,
    database: _database,
  });

type GiveClient = (void) => NativeClient;

const connectToDatabase = (_database: string): Promise<GiveClient> => {
  const client = createDatabaseClient(_database);
  const giveClient: GiveClient = () => client;
  return client
    .connect()
    .then(giveClient);
};

const start = () => connectToDatabase(databaseName);
const closeClient = (client: NativeClient): Promise<void> => client.end();

export {
  connectToDatabase,
  start,
  closeClient,
  databaseName,
};
