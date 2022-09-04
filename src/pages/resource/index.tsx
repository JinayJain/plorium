import Layout from "@/components/layout/Layout";
import InferNextProps from "@/util/types/InferNextProps";
import { Box, Heading, Link, Stack } from "@chakra-ui/react";

function Resources({ resources }: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout>
      <Heading>Resources</Heading>
      <Stack spacing={4}>
        {resources.map((resource) => (
          <Box key={resource.id}>
            <Link href={`/resource/${resource.id}`}>{resource.name}</Link>
          </Box>
        ))}
      </Stack>
    </Layout>
  );
}

export async function getServerSideProps() {
  const resources = await prisma.resource.findMany();

  return {
    props: {
      resources,
    },
  };
}

export default Resources;
