/* @flow */
import Router from 'koa-router';

// import * as UserController from 'controllers/user';
import { AuthentificationError } from '@/errors';

const router = new Router();

router.post('/users/login', async (ctx, next) => {
  // const authenticatedUser = await UserController.authenticate(ctx.query)
  //   .catch((error) => {
  //     if (error instanceof AuthentificationError) ctx.throw(401, error);
  //     ctx.throw(error);
  //   });
  //
  // ctx.body = authenticatedUser;
  next();
});

export default router;
