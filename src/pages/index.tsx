import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import Layout from "@/components/layout/Layout";
import RoadmapPreviewCard from "@/components/roadmap/RoadmapPreviewCard";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

const Home = ({ roadmaps }: InferNextProps<typeof getStaticProps>) => {
  return (
    <Layout>
      <Flex justify="center" align="center" h={400}>
        <Box textAlign="center">
          <Heading size="2xl" mb={4}>
            The{" "}
            <Text as="span" textDecor="underline 4px green">
              syllabus
            </Text>{" "}
            for your self-learning journey
          </Heading>
          <Text fontSize="xl" color="gray" mb={8}>
            Find the best resources to learn any topic. Curated by experts, and
            vetted by people like you.
          </Text>
          <Link href="/explore" passHref>
            <Button as="a" rightIcon={<FaArrowRight />} colorScheme="green">
              Start your journey
            </Button>
          </Link>
        </Box>
      </Flex>

      <Box mt={16}>
        <Heading size="lg" mb={8}>
          Roadmaps for any topic
        </Heading>
        <SimpleGrid minChildWidth={300} spacing={4}>
          {roadmaps.map((roadmap) => (
            <RoadmapPreviewCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const roadmaps = await prisma.roadmap.findMany({
    take: 10,
    include: {
      _count: {
        select: {
          blocks: { where: { resourceBlock: { isNot: null } } },
          learners: true,
        },
      },
    },
    orderBy: {
      learners: { _count: "desc" },
    },
  });

  return {
    props: {
      roadmaps,
    },
  };
};

export default Home;
