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
  .mutation("toggleVote", {
    input: z.number(),
    async resolve({ input: resourceId, ctx }) {
      if (!ctx.session) {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be signed in to vote for a resource",
        });
      }

      const userId = ctx.session.user.id;

      const vote = await prisma.resourceVote.findUnique({
        where: {
          resourceId_userId: {
            resourceId,
            userId,
          },
        },
      });

      if (vote) {
        await prisma.resourceVote.delete({
          where: {
            resourceId_userId: {
              resourceId,
              userId,
            },
          },
        });
      } else {
        await prisma.resourceVote.create({
          data: {
            resourceId,
            userId,
          },
        });
      }

      return true;
    },
  })
  .query("votes", {
    input: z.number(),
    async resolve({ input: resourceId, ctx }) {
      const votes = await prisma.resourceVote.count({
        where: {
          resourceId,
        },
      });

      const userId = ctx.session?.user.id;
      const userVote = userId
        ? await prisma.resourceVote.findUnique({
            where: {
              resourceId_userId: {
                resourceId,
                userId,
              },
            },
          })
        : null;

      return {
        votes,
        userVoted: !!userVote,
      };
    },
  })
  .query("suggestions", {
    input: z.object({
      query: z.string(),
      limit: z.number().optional(),
    }),
    async resolve({ input: { query, limit = 5 } }) {
      const resources = await prisma.resource.findMany({
        where: {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        take: limit,
      });

      return resources;
    },
  });

export default resourceRouter;
