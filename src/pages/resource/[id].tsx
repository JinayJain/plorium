import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";

import Layout from "@/components/layout/Layout";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function ViewResource({
  resource,
  roadmaps,
}: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout>
      <Box mt={8}>
        <Heading size="2xl" mb={2}>
          {resource.title}
        </Heading>
        <Link
          fontSize="xl"
          color="gray"
          href={resource.url}
          target="_blank"
          w="fit-content"
          isExternal
        >
          {resource.url} <ArrowForwardIcon />
        </Link>
        <Text color="gray" mt={2}>
          CONTRIBUTED BY{" "}
          <Text as="span" fontWeight="bold" color="black">
            {resource.author.name}
          </Text>
        </Text>
        <Text fontSize="lg" my={4}>
          {resource.description}
        </Text>

        <Heading size="md">Found in</Heading>
        <Stack>
          {roadmaps.map((roadmap) => (
            <NextLink href={`/roadmap/${roadmap.id}`} key={roadmap.id} passHref>
              <Link fontSize="xl" color="gray" w="fit-content">
                {roadmap.title} <ArrowForwardIcon />
              </Link>
            </NextLink>
          ))}
        </Stack>
      </Box>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const idNumber = parseInt(id as string);

  const resource = await prisma.resource.findUnique({
    where: {
      id: idNumber,
    },
    include: {
      author: true,
    },
  });

  const roadmaps = await prisma.roadmap.findMany({
    where: {
      blocks: {
        some: {
          resourceBlock: {
            resourceId: idNumber,
          },
        },
      },
    },
  });

  if (!resource) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      resource,
      roadmaps,
    },
  };
};

export default ViewResource;
