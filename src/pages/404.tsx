import { Button, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import Layout from "../components/layout";
import NextLink from "next/link";

const Page404 = () => {
  return (
    <Layout title="404">
      <Stack
        justify={["initial", "initial", "center"]}
        pt={12}
        minH="inherit"
        maxW="800px"
        m="auto"
        flexDir="column"
        spacing={12}
      >
        <Stack spacing={4}>
          <Heading>
            Sorry, we couldn&apos;t find the page you were looking for
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Let&apos;s get you back to finding the best learning resources
          </Text>
        </Stack>
        <NextLink href="/" passHref>
          <Button
            as="a"
            alignSelf={["initial", "initial", "center"]}
            colorScheme="blue"
            variant="outline"
          >
            Go Home
          </Button>
        </NextLink>
      </Stack>
    </Layout>
  );
};

export default Page404;
