import { Heading, SimpleGrid } from "@chakra-ui/react";

import Layout from "@/components/layout/Layout";
import RoadmapPreviewCard from "@/components/roadmap/RoadmapPreviewCard";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function Explore({ roadmaps }: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout title="Explore">
      <Heading my={4}>Explore</Heading>

      <SimpleGrid minChildWidth={300} spacing={4}>
        {roadmaps.map((roadmap) => (
          <RoadmapPreviewCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </SimpleGrid>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const roadmaps = await prisma.roadmap.findMany({
    include: {
      _count: {
        select: {
          learners: true,
          blocks: {
            where: {
              resourceBlock: {
                isNot: null,
              },
            },
          },
        },
      },
    },

    orderBy: {
      learners: {
        _count: "desc",
      },
    },
  });

  return {
    props: {
      roadmaps,
    },
  };
};

export default Explore;
