/* @flow */
import Router from 'koa-router';

import { withJwt } from 'middlewares/auth';
import { useRoutersFromDirectory } from '@/routing';

import publicRouter from './public';

/* Automatically detect all route files and inject their routes handlers
  into the frontend router
  setup initially the unprotected public routes, then protect with jwt
  any next routes plugged into the frontend router */

const router = new Router();

router
  .use(publicRouter.routes())
  .use(publicRouter.allowedMethods())
  .use(withJwt);

useRoutersFromDirectory(__dirname, router);

export default router;
