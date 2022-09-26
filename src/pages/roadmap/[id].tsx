import { Heading, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";

import Layout from "@/components/layout/Layout";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function Roadmap({
  title,
  author,
  description,
  blocks,
}: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout>
      <Heading>{title}</Heading>
      <Heading size="md">by {author.name}</Heading>
      <Text>{description}</Text>
      {blocks.map((block) => {
        if (block.resourceBlock) {
          return (
            <Text key={block.resourceBlock.id}>
              {block.resourceBlock.resource.title}
            </Text>
          );
        }

        if (block.noteBlock) {
          return (
            <Text key={block.noteBlock.id}>{block.noteBlock.content}</Text>
          );
        }

        return null;
      })}
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
