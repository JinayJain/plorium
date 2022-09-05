import * as trpcNext from "@trpc/server/adapters/next";

import { createContext, createRouter } from "@/core/api/context";
import resourceRouter from "@/core/api/router/resource";

const appRouter = createRouter().merge("resource.", resourceRouter);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
