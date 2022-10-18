import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { Fragment } from "react";

import Layout from "@/components/layout/Layout";
import BlockContainer from "@/components/roadmap/BlockContainer";
import NoteBlock from "@/components/roadmap/NoteBlock";
import ResourceBlock from "@/components/roadmap/ResourceBlock";
import pluralize from "@/util/functions/pluralize";
import roadmapEditorSlice from "@/util/redux/slice/roadmapEditorSlice";
import { prisma } from "@/util/server/db/prisma";
import { trpc } from "@/util/trpc";
import InferNextProps from "@/util/types/InferNextProps";

function Roadmap({
  id,
  title,
  author,
  description,
  blocks,
  _count: { learners },
}: InferNextProps<typeof getServerSideProps>) {
  const spacing = 4;

  const toast = useToast();
  const utils = trpc.useContext();
  const subscribe = trpc.useMutation("roadmap.toggleSubscribe", {
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    },
  });
  const { data: isSubscribed, isLoading } = trpc.useQuery([
    "roadmap.isSubscribed",
    id,
  ]);

  const handleSubscribe = async () => {
    await subscribe.mutateAsync(id);

    utils.invalidateQueries(["roadmap.isSubscribed", id]);
  };

  return (
    <Layout variant="bare" title={[title, "Roadmap"]}>
      <Box textAlign="center" mt={16} maxW="container.xl" mx="auto" px={8}>
        <Heading mb={4} size="2xl">
          {title}
        </Heading>
        <Text fontSize="lg" mb={4}>
          <Avatar size="xs" ml={2} src={author.image ?? ""} /> {author.name}
        </Text>
        <Text mb={8}>{description}</Text>

        <Button
          colorScheme="blue"
          variant={isSubscribed ? "outline" : "solid"}
          onClick={handleSubscribe}
          isLoading={isLoading}
          mb={2}
        >
          {isSubscribed ? "Leave Roadmap" : "Begin Roadmap"}
        </Button>

        <Text>{pluralize(learners, "learner")}</Text>
      </Box>

      <Container maxW="container.xl" mt={16}>
        <Grid templateColumns="40px 1fr" rowGap={spacing} columnGap={4}>
          {blocks.map((block, index) => (
            <BlockContainer
              key={block.id}
              hoverable={!!block.resourceBlock}
              label={index + 1}
              isFirst={index === 0}
              isLast={index === blocks.length - 1}
              spacing={spacing}
            >
              {block.resourceBlock && (
                <ResourceBlock resource={block.resourceBlock.resource} />
              )}
              {block.noteBlock && (
                <NoteBlock
                  content={block.noteBlock.content}
                  title={block.noteBlock.title}
                />
              )}
            </BlockContainer>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;

  try {
    const roadmap = await prisma.roadmap.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
      include: {
        _count: {
          select: {
            learners: true,
          },
        },
        blocks: {
          orderBy: {
            order: "asc",
          },
          include: {
            resourceBlock: {
              include: {
                resource: {
                  include: {
                    _count: {
                      select: {
                        votes: true,
                      },
                    },
                  },
                },
              },
            },
            noteBlock: true,
          },
        },
        author: true,
      },
    });

    return {
      props: {
        ...roadmap,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Roadmap;
