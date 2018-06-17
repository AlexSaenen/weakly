/* @flow */
import Router from 'koa-router';
import { getEventsForFrontend } from 'stories/dashboard';

const router = new Router();

const handleGetEvents = async (ctx) => {
  const {
    pageSize = 20,
    page = 0,
    searchName = '',
    searchLocation = '',
    sort = [],
  } = ctx.query;

  const events = await getEventsForFrontend({
    pageSize,
    page,
    searchName,
    searchLocation,
    sort,
  });

  ctx.body = events;
};

router.get('/', handleGetEvents);

export default router;
