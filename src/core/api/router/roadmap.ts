import * as trpc from "@trpc/server";
import { z } from "zod";

import { prisma } from "@/util/server/db/prisma";

import { createRouter } from "../context";
import { roadmapSchema } from "../schema";

const roadmapRouter = createRouter()
  .mutation("create", {
    input: roadmapSchema,
    async resolve({ input: { title, description, blocks }, ctx }) {
      if (!ctx.session) {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be signed in to create a roadmap",
        });
      }

      const authorId = ctx.session.user.id;

      return await prisma.$transaction(async (tx) => {
        const roadmap = await tx.roadmap.create({
          data: {
            title,
            description,
            authorId,
          },
        });

        await Promise.all(
          blocks.map(async (block, index) =>
            block.kind === "note"
              ? tx.noteBlock.create({
                  data: {
                    block: {
                      create: {
                        roadmapId: roadmap.id,
                        order: index,
                      },
                    },
                    ...block.note,
                  },
                })
              : tx.resourceBlock.create({
                  data: {
                    resource: {
                      connectOrCreate: {
                        where: {
                          id: block.resource.id ?? -1,
                        },
                        create: {
                          ...block.resource,
                          authorId,
                        },
                      },
                    },
                    block: {
                      create: {
                        roadmapId: roadmap.id,
                        order: index,
                      },
                    },
                  },
                }),
          ),
        );

        return roadmap;
      });
    },
  })
  .query("isSubscribed", {
    input: z.number(),
    async resolve({ input: roadmapId, ctx }) {
      if (!ctx.session) {
        return false;
      }

      const subscription = await prisma.roadmapLearner.findUnique({
        where: {
          roadmapId_userId: {
            roadmapId,
            userId: ctx.session.user.id,
          },
        },
      });

      return !!subscription;
    },
  })
  .mutation("toggleSubscribe", {
    input: z.number(),
    async resolve({ input: roadmapId, ctx }) {
      if (!ctx.session) {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be signed in to subscribe to a roadmap",
        });
      }

      const userId = ctx.session.user.id;

      const subscription = await prisma.roadmapLearner.findUnique({
        where: {
          roadmapId_userId: {
            roadmapId,
            userId,
          },
        },
      });

      if (subscription) {
        return await prisma.roadmapLearner.delete({
          where: {
            roadmapId_userId: {
              roadmapId,
              userId,
            },
          },
        });
      } else {
        return await prisma.roadmapLearner.create({
          data: {
            roadmapId,
            userId,
          },
        });
      }
    },
  });

export default roadmapRouter;
