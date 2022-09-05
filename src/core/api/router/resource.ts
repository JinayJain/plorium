import { ResourceType } from "@prisma/client";
import * as trpc from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/util/server/db/prisma";

const resourceRouter = trpc.router().mutation("create", {
  input: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    type: z.nativeEnum(ResourceType),
  }),
  async resolve({ input: { name, description, url, type } }) {
    const resource = await prisma.resource.create({
      data: {
        name,
        description,
        url,
        type,
        authorId: "cl7kgwch100060tqjaty9phsr", // TODO: get from session
      },
    });

    return resource;
  },
});

export default resourceRouter;
