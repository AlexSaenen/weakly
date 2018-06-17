/* @flow */
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import gracefulShutdown from 'http-graceful-shutdown';

import catchErrors from 'middlewares/error';

// import db, {
//   closeClient as shutdownDatabase,
//   startClient as startDatabase,
// } from './database';
import router from './routes';

const start = async () => {
  // await startDatabase(db)
  //   .catch((databaseError) => {
  //     console.error(databaseError);
  //     process.exit(1);
  //   });

  const app = new Koa();

  app.use(catchErrors);
  app.on('error', error => console.error(error));

  app
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

  const server = app.listen(3000); // TODO: get from config

  gracefulShutdown(server, {
    // onShutdown: () => shutdownDatabase(db),
  });
};

export default start();
export { start };
