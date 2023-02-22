import { procedure, router } from '../trpc';

export const appRouter = router({
  healthy: procedure.query(() => 'healthy')
});

export type AppRouter = typeof appRouter;
