import {
  Box,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

import Layout from "@/components/layout/Layout";
import pluralize from "@/util/functions/pluralize";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function Explore({ roadmaps }: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout>
      <Heading>Explore</Heading>

      <SimpleGrid minChildWidth={300} spacing={4}>
        {roadmaps.map((roadmap) => (
          <LinkBox
            display="flex"
            flexDir="column"
            key={roadmap.id}
            borderWidth={1}
            p={4}
            rounded="sm"
          >
            <NextLink href={`/roadmap/${roadmap.id}`} passHref>
              <LinkOverlay>
                <Heading size="sm">{roadmap.title}</Heading>
              </LinkOverlay>
            </NextLink>
            <Text>{roadmap.description}</Text>
            <Text color="gray.500" mt="auto" pt={2}>
              {pluralize(roadmap._count.learners, "learner")}
            </Text>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const roadmaps = await prisma.roadmap.findMany({
    take: 10,
    include: {
      _count: {
        select: {
          learners: true,
        },
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
