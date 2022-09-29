import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import { Fragment } from "react";

import Layout from "@/components/layout/Layout";
import TypeTag from "@/components/resource/TypeTag";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function ResourceBlock({ resource }: { resource: Resource }) {
  return (
    <>
      <TypeTag size="sm" type={resource.type} mb={2} />
      <NextLink href={`/resource/${resource.id}`} passHref>
        <Link>
          <Heading size="md" mb={2}>
            {resource.title}
          </Heading>
        </Link>
      </NextLink>
      <Text>{resource.description}</Text>
    </>
  );
}

function NoteBlock({
  content,
  title,
}: {
  content: string;
  title: string | null;
}) {
  return (
    <>
      {title && (
        <Heading size="md" mb={2}>
          {title}
        </Heading>
      )}
      <Text>{content}</Text>
    </>
  );
}

function Roadmap({
  title,
  author,
  description,
  blocks,
}: InferNextProps<typeof getServerSideProps>) {
  const spacing = 4;

  return (
    <Layout variant="bare">
      <Box textAlign="center" mt={16}>
        <Heading mb={4} size="2xl">
          {title}
        </Heading>
        <Text fontSize="lg" mb={4}>
          <Avatar size="xs" ml={2} src={author.image ?? ""} /> {author.name}
        </Text>
        <Text>{description}</Text>
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
