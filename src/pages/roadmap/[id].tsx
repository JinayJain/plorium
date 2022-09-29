import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { Fragment } from "react";

import Layout from "@/components/layout/Layout";
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

  const utils = trpc.useContext();
  const subscribe = trpc.useMutation("roadmap.toggleSubscribe");
  const { data: isSubscribed, isLoading } = trpc.useQuery([
    "roadmap.isSubscribed",
    id,
  ]);

  const handleSubscribe = async () => {
    await subscribe.mutateAsync(id);

    utils.invalidateQueries(["roadmap.isSubscribed", id]);
  };

  return (
    <Layout variant="bare">
      <Box textAlign="center" mt={16}>
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
            <Fragment key={index}>
              <GridItem colSpan={1} position="relative" userSelect="none">
                <Box
                  position="absolute"
                  top={index === 0 ? "50%" : -spacing / 2}
                  bottom={index === blocks.length - 1 ? "50%" : -spacing / 2}
                  left="50%"
                  transform="translateX(-50%)"
                  width="2px"
                  bg="gray.200"
                />

                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  bg="white"
                  borderRadius="full"
                  borderWidth={1}
                  w={10}
                  h={10}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {index + 1}
                </Box>
              </GridItem>
              <GridItem colSpan={1} borderWidth={1} p={4} borderRadius="md">
                {block.resourceBlock && (
                  <ResourceBlock resource={block.resourceBlock.resource} />
                )}
                {block.noteBlock && (
                  <NoteBlock
                    content={block.noteBlock.content}
                    title={block.noteBlock.title}
                  />
                )}
              </GridItem>
            </Fragment>
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
                resource: true,
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
    console.log(e);

    return {
      notFound: true,
    };
  }
};

export default Roadmap;
