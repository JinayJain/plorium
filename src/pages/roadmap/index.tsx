import { Box, Heading, Link, Stack } from "@chakra-ui/react";
import NextLink from "next/link";

import Layout from "@/components/layout/Layout";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function Roadmaps({ roadmaps }: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout>
      <Heading>Roadmaps</Heading>

      <Stack spacing={4}>
        {roadmaps.map((roadmap) => (
          <Box key={roadmap.id}>
            <NextLink href={`/roadmap/${roadmap.id}`} passHref>
              <Link>{roadmap.title}</Link>
            </NextLink>{" "}
            by {roadmap.author.name}
          </Box>
        ))}
      </Stack>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const roadmaps = await prisma.roadmap.findMany({
    include: {
      author: true,
    },
  });

  return {
    props: {
      roadmaps,
    },
  };
};

export default Roadmaps;
