import * as trpcNext from "@trpc/server/adapters/next";

import { createContext, createRouter } from "@/core/api/context";
import resourceRouter from "@/core/api/router/resource";
import roadmapRouter from "@/core/api/router/roadmap";

const appRouter = createRouter()
  .merge("resource.", resourceRouter)
  .merge("roadmap.", roadmapRouter);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
