import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Box bg="gray.100" h="100vh">
      <Flex h="100%" w="100%" align="center" justify="center">
        <Stack maxW="40%" spacing={4}>
          <Heading>Plorium, the exploration emporium</Heading>
          <Text color="gray.600" fontSize="lg">
            Plorium aims to drastically simplify the self-learning process. We
            want to allow individuals to learn what they want in the most
            efficient and enjoyable way possible.
          </Text>
          <Text color="gray.600">
            Are you an avid self-learner? Email us at{" "}
            <Link href="mailto:hello@plorium.com" textDecor="underline">
              hello@plorium.com
            </Link>
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Home;
