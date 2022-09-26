import { ResourceType } from "@prisma/client";
import * as trpc from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/util/server/db/prisma";

import { createRouter } from "../context";
import { resourceSchema } from "../schema";

const resourceRouter = createRouter()
  .mutation("create", {
    input: resourceSchema,
    async resolve({ input: { title, description, url, type }, ctx }) {
      if (!ctx.session) {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be signed in to create a resource",
        });
      }

      const resource = await prisma.resource.create({
        data: {
          title,
          description,
          url,
          type,
          authorId: ctx.session.user.id,
        },
      });

      return resource;
    },
  })
  .query("suggestions", {
    input: z.string(),
    async resolve({ input: query }) {
      const resources = await prisma.resource.findMany({
        where: {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        take: 5,
      });

      return resources;
    },
  });

export default resourceRouter;
