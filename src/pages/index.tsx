import { Box, Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Box h="100vh" bg="gray.100">
      <Flex h="100%" align="center" justify="center">
        <Heading as="h1" size="2xl" color="gray.700">
          Under Construction
        </Heading>
      </Flex>
    </Box>
  );
};

export default Home;
