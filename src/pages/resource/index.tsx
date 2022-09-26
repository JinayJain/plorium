import { Box, Heading, Link, Stack } from "@chakra-ui/react";

import Layout from "@/components/layout/Layout";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function Resources({ resources }: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout>
      <Heading>Resources</Heading>
      <Stack spacing={4}>
        {resources.map((resource) => (
          <Box key={resource.id}>
            <Link href={`/resource/${resource.id}`}>{resource.title}</Link> by{" "}
            {resource.author.name}
          </Box>
        ))}
      </Stack>
    </Layout>
  );
}

export async function getServerSideProps() {
  const resources = await prisma.resource.findMany({
    include: {
      author: true,
    },
  });

  return {
    props: {
      resources,
    },
  };
}

export default Resources;
