/* @flow */
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import gracefulShutdown from 'http-graceful-shutdown';

import sentry from '@/sentry';
import { serve as serveDocumentation } from 'middlewares/documentation';
import catchErrors from 'middlewares/error';

import db, {
  closeClient as shutdownDatabase,
  startClient as startDatabase,
} from './database';
import router from './routes';

const start = async () => {
  sentry.install();

  await startDatabase(db)
    .catch((databaseError) => {
      sentry.captureExceptionWithContext(databaseError);
      process.exit(1);
    });

  const app = new Koa();

  app.use(catchErrors);
  app.on('error', error => sentry.captureExceptionWithContext(error));

  app
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

  serveDocumentation(app);

  const server = app.listen(3000); // TODO: get from config

  gracefulShutdown(server, {
    onShutdown: () => shutdownDatabase(db),
  });
};

export default start();
export { start };
