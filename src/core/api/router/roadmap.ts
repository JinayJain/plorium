import * as trpc from "@trpc/server";

import { prisma } from "@/util/server/db/prisma";

import { createRouter } from "../context";
import { roadmapSchema } from "../schema";

const roadmapRouter = createRouter().mutation("create", {
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
          tx.resourceBlock.create({
            data: {
              resource: {
                create: {
                  ...block,
                  authorId,
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
});

export default roadmapRouter;
