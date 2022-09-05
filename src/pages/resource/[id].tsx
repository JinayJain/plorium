import { Heading, Link, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";

import Layout from "@/components/layout/Layout";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function ViewResource({ resource }: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout>
      <Heading>{resource.name}</Heading>
      <Text>{resource.description}</Text>
      <Link href={resource.url} target="_blank">
        {resource.url}
      </Link>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;

  try {
    const resource = await prisma.resource.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });

    return {
      props: {
        resource,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default ViewResource;
