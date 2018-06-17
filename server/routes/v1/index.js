/* @flow */
import Router from 'koa-router';

import frontendRouter from './frontend';

const mainRouter = new Router();
mainRouter
  .use(
    '/front',
    frontendRouter.routes(),
    frontendRouter.allowedMethods(),
  );

export default mainRouter;
