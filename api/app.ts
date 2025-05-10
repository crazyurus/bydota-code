import Koa from 'koa';
import body from 'koa-body';
import logger from 'koa-logger';

const app = new Koa();

app.use(body());
app.use(logger());

export default app;
