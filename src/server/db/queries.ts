import { prisma } from "./prisma";

function getRoadmapById(id: number) {
  return prisma.roadmap.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      resources: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
}

export { getRoadmapById };
