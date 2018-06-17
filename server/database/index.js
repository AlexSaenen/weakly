/* @flow */
import Sequelize from 'sequelize';
import config from 'config';
import fs from 'fs';
import chalk from 'chalk';

import { getPath, isAFile } from '@/fs';

const [
  database,
  username,
  password,
  options,
] = [
  config.get('postgres.database'),
  config.get('postgres.username'),
  config.get('postgres.password'),
  config.get('postgres.options'),
];

const sequelizeOptions = [
  database,
  username,
  password,
  { dialect: 'postgres', ...options },
];

const createDatabaseClient = () => new Sequelize(...sequelizeOptions);

const initializeModels = (client) => {
  const initialModels = {};
  const pathToModelsFolder = getPath(__dirname)('models');
  const getFilePath = file => getPath(pathToModelsFolder)(file);
  const importModels = (_models, file) => {
    const model = client.import(file);
    return { ..._models, [model.name]: model };
  };

  const models = fs
    .readdirSync(pathToModelsFolder)
    .map(getFilePath)
    .filter(isAFile)
    .reduce(importModels, initialModels);

  const modelNeedsAssociation = ([, model]) => 'associate' in model;
  const associateModel = ([, model]) => model.associate(models);

  Object
    .entries(models)
    .filter(modelNeedsAssociation)
    .forEach(associateModel);

  return models;
};

const connectClient = client => client
  .authenticate()
  .catch((error) => {
    const fullErrorMessage = chalk`{red Failed to connect to the database}: ${error}`;
    throw new Error(fullErrorMessage);
  });

const startClient = client =>
  connectClient(client)
    .then(() => initializeModels(client));

const closeClient = client => client.close();

const defaultClient = createDatabaseClient();
export default defaultClient;

const { Op } = Sequelize;
export {
  Sequelize,
  Op,
  createDatabaseClient,
  initializeModels,
  connectClient,
  startClient,
  closeClient,
};
