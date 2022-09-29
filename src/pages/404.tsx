import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import Layout from "@/components/layout/Layout";

function Error404() {
  return (
    <Layout title="404">
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Heading>404</Heading>
        <Text color="gray" fontSize="lg" mb={2}>
          Page not found.
        </Text>
        <NextLink href="/" passHref>
          <Link color="blue.500">Go home</Link>
        </NextLink>
      </Flex>
    </Layout>
  );
}

export default Error404;
