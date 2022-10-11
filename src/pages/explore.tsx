import { Heading, SimpleGrid } from "@chakra-ui/react";

import Layout from "@/components/layout/Layout";
import ResourcePreviewCard from "@/components/resource/ResourcePreviewCard";
import RoadmapPreviewCard from "@/components/roadmap/RoadmapPreviewCard";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function Explore({
  roadmaps,
  resources,
}: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout title="Explore">
      <Heading my={4}>Explore</Heading>

      <Heading size="md" mb={2}>
        Roadmaps
      </Heading>
      <SimpleGrid minChildWidth={300} spacing={4}>
        {roadmaps.map((roadmap) => (
          <RoadmapPreviewCard key={roadmap.id} roadmap={roadmap} />
        ))}
      </SimpleGrid>

      <Heading size="md" mb={2} mt={8}>
        Resources
      </Heading>

      <SimpleGrid minChildWidth={300} spacing={4}>
        {resources.map((resource) => (
          <ResourcePreviewCard key={resource.id} resource={resource} />
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
    take: 10,
  });

  const resources = await prisma.resource.findMany({
    include: {
      _count: {
        select: {
          votes: true,
        },
      },
    },
    orderBy: {
      votes: {
        _count: "desc",
      },
    },
    take: 20,
  });

  return {
    props: {
      roadmaps,
      resources,
    },
  };
};

export default Explore;
