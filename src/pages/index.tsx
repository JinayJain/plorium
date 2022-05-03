import { Box, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Fonts from "../lib/theme/fonts";

const Home: NextPage = () => {
  const title = "Beginner's Guide to Artificial Intelligence";
  return (
    <Box>
      <Heading>{title}</Heading>
      <Text>This is a simple example of a Next.js page.</Text>
    </Box>
  );
};

export default Home;
