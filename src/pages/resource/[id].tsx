import { Heading, Link, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";

import Layout from "@/components/layout/Layout";
import { prisma } from "@/util/server/db/prisma";
import InferNextProps from "@/util/types/InferNextProps";

function ViewResource({ resource }: InferNextProps<typeof getServerSideProps>) {
  return (
    <Layout>
      <Heading>{resource.title}</Heading>
      <Text>{resource.description}</Text>
      <Link href={resource.url} target="_blank">
        {resource.url}
      </Link>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;

  const resource = await prisma.resource.findUnique({
    where: {
      id: Number(id),
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
    },
  };
};

export default ViewResource;
