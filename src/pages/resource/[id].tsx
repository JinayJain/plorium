import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { FaChevronUp } from "react-icons/fa";

import Layout from "@/components/layout/Layout";
import TypeTag from "@/components/resource/TypeTag";
import RoadmapPreviewCard from "@/components/roadmap/RoadmapPreviewCard";
import { prisma } from "@/util/server/db/prisma";
import { trpc } from "@/util/trpc";
import InferNextProps from "@/util/types/InferNextProps";

function ViewResource({
  resource,
  roadmaps,
}: InferNextProps<typeof getServerSideProps>) {
  const { data, refetch } = trpc.useQuery(["resource.votes", resource.id]);
  const toggleVote = trpc.useMutation("resource.toggleVote", {
    onSuccess() {
      refetch();
    },
  });

  const handleVote = async () => {
    await toggleVote.mutateAsync(resource.id);
  };

  return (
    <Layout
      title={[resource.title, "Resource"]}
      ogProps={{ title: resource.title, type: "resource" }}
    >
      <Box borderWidth="1px" borderRadius="lg" p={[8, 8, 16]}>
        <Flex>
          <Box flex={1}>
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
          </Box>

          <Box>
            {data ? (
              <VStack>
                <IconButton
                  aria-label="Upvote"
                  icon={<FaChevronUp />}
                  colorScheme="green"
                  variant={data.userVoted ? "solid" : "outline"}
                  size="md"
                  onClick={handleVote}
                />
                <Text fontSize="xl" lineHeight={1}>
                  {data.votes}
                </Text>
              </VStack>
            ) : (
              <Spinner />
            )}
          </Box>
        </Flex>

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
            <RoadmapPreviewCard key={roadmap.id} roadmap={roadmap} />
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
