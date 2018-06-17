/* @flow */
import Router from 'koa-router';
import { getTasks } from 'stories/planner';

const router = new Router();

const handleGetTasks = async (ctx) => {
  const {
  } = ctx.query;

  const tasks = await getTasks({
  });

  ctx.body = tasks;
};

router.get('/', handleGetTasks);

export default router;
