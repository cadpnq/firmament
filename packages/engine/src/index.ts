import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers/root';

const app = express();

app.use(
  '/',
  trpcExpress.createExpressMiddleware({
    router: appRouter
  })
);

// TODO: this should be pulled from the environment.
app.listen(9001, () => {
  // TODO: set up winston
  console.log('Listening on port 9001');
});
