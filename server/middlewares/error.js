export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = err.stack;
    ctx.status = err.status || 500;
    ctx.app.emit('error', err, ctx);
  }
};
