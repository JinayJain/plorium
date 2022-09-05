import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = await unstable_getServerSession(
    opts.req,
    opts.res,
    authOptions,
  );

  return {
    session,
  };
}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
