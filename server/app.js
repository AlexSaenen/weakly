/* @flow */
import Koa from 'koa';
import chalk from 'chalk';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import withQuerystring from 'koa-qs';
import gracefulShutdown from 'http-graceful-shutdown';

import handleMiddlewareErrors from 'middlewares/error';

import db, {
  startClient as startDatabase,
  closeClient as shutdownDatabase,
} from 'db';
import router from './routes';

export const startServer = async () => {
  startDatabase(db)
    .catch((databaseError) => {
      console.log(chalk.red(databaseError));
      process.exit(1);
    });

  const app = new Koa();

  withQuerystring(app);
  app.use(handleMiddlewareErrors);
  app.on('error', error => console.log(chalk.red(error)));

  app
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

  const port = process.env.PORT || 3003;
  const server = app.listen(port); // TODO: get from config

  gracefulShutdown(server, {
    onShutdown: () => shutdownDatabase(db),
  });

  return server;
};

const server = startServer();
export default server;
