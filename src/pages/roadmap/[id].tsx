import {
  Avatar,
  Box,
  Container,
  Heading,
  Link,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";

import Layout from "@/components/layout/Layout";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function ResourceBlock({ resource }: { resource: Resource }) {
  return (
    <>
      <Tag size="sm" colorScheme="yellow">
        {resource.type}
      </Tag>
      <NextLink href={`/resource/${resource.id}`} passHref>
        <Link>
          <Heading size="md" my={2}>
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
      <Heading size="md">{title}</Heading>
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
        <Stack spacing={0}>
          {blocks.map((block, index) => (
            <Box key={block.id}>
              {index !== 0 && <Box m="auto" h={8} bg="gray.200" w={2} />}
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                {block.resourceBlock ? (
                  <ResourceBlock resource={block.resourceBlock.resource} />
                ) : block.noteBlock ? (
                  <NoteBlock {...block.noteBlock} />
                ) : null}
              </Box>
            </Box>
          ))}
        </Stack>
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
