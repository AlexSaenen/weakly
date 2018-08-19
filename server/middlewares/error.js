/* eslint-disable no-console */
export default async (ctx, next) => {
  try {
    await next();
  } catch (exception) {
    console.error(exception);

    if (exception.errors) { // sequelize error
      console.log('Sequelize errors body: ', JSON.stringify(exception.errors));
    }

    ctx.body = exception.stack;
    ctx.status = exception.status || 500;
    ctx.app.emit('error', exception, ctx);
  }
};
