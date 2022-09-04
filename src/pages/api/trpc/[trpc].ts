import resourceRouter from "@/core/api/router/resource";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

const appRouter = trpc.router().merge("resource.", resourceRouter);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
