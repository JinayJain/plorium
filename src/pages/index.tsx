import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import Layout from "@/components/layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex justify="center" align="center" h={400}>
        <Box textAlign="center">
          <Heading size="2xl" mb={4}>
            The{" "}
            <Text as="span" textDecor="underline 4px green">
              syllabus
            </Text>{" "}
            for your self-learning journey
          </Heading>
          <Text fontSize="xl" color="gray" mb={8}>
            Plorium helps you save hours of searching for resources, so you can
            spend more time learning.
          </Text>
          <Link href="/explore" passHref>
            <Button as="a" rightIcon={<FaArrowRight />} colorScheme="green">
              Start your journey
            </Button>
          </Link>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Home;
