import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";

import Layout from "@/components/layout/Layout";
import TypeTag from "@/components/resource/TypeTag";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function ViewResource({
  resource,
  roadmaps,
}: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout>
      <Box borderWidth="1px" borderRadius="lg" p={[8, 8, 16]}>
        <TypeTag type={resource.type} mb={2} />
        <Heading size="2xl" my={2}>
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
          {resource.url} <ExternalLinkIcon mx="2px" />
        </Link>

        <Text fontSize="lg" my={8}>
          {resource.description}
        </Text>

        <Text color="gray">
          CONTRIBUTED BY{" "}
          <Avatar size="xs" ml={2} src={resource.author.image ?? ""} />{" "}
          <Text as="span" fontWeight="bold" color="black">
            {resource.author.name}
          </Text>
        </Text>
      </Box>

      <Box mt={12}>
        <Heading size="md">Roadmaps with this resource</Heading>

        <SimpleGrid minChildWidth="300px" spacing={4} mt={4}>
          {roadmaps.map((roadmap) => (
            <Box key={roadmap.id} p={4} borderWidth="1px" borderRadius="md">
              <NextLink href={`/roadmap/${roadmap.id}`} passHref>
                <Link>
                  <Heading size="sm">{roadmap.title}</Heading>
                </Link>
              </NextLink>

              <Text color="gray" mt={2}>
                {roadmap.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
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
