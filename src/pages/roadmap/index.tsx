import Block, { BlockProps } from "../../components/roadmap/Block";
import Sidebar from "../../components/roadmap/Sidebar";
import TableOfContents from "../../components/roadmap/TableOfContents";
import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import type { NextPage } from "next";

const Header = ({ title, ...props }: { title: string } & BoxProps) => (
  <Flex
    flex={1}
    h={300}
    textAlign="center"
    gap={2}
    flexDir="column"
    justify="flex-end"
    {...props}
  >
    <Heading color="green.700" fontWeight="normal" size="md">
      5 Days &middot; {RESOURCES.length} Resources &middot; Beginner
    </Heading>
    <Heading size="xl">{title}</Heading>
  </Flex>
);

const Home: NextPage = () => {
  const title = "Beginner's Guide to Artificial Intelligence";
  const description =
    "A comprehensive guide to the world of artificial intelligence, with a focus on machine learning and deep learning.";
  const author = "Jinay Jain";

  return (
    <Box>
      <Header title={title} mb={8} />
      <Flex maxW="1400px" m="auto" align="flex-start">
        <Sidebar
          title={title}
          description={description}
          author={author}
          maxW="200px"
          position="sticky"
          top={8}
          display={{
            base: "none",
            md: "block",
          }}
          pr={8}
        />
        <Stack gap={4}>
          {RESOURCES.map((resource, index) => (
            <Block key={index} {...resource} />
          ))}
        </Stack>
        <TableOfContents
          resources={RESOURCES}
          position="sticky"
          top={8}
          display={{
            base: "none",
            lg: "block",
          }}
          pl={8}
        />
      </Flex>
    </Box>
  );
};

export default Home;

// a list of resources for learning about machine learning, in order
const RESOURCES: BlockProps[] = [
  {
    type: "text",
    title: "What is Machine Learning?",
    description:
      "First, we need to understand the types of problems machine learning is best at solving. This article will help you understand the overall scope of machine learning and how it fits into the broader field of artificial intelligence.",
  },
  {
    type: "text",
    title: "Essential Python for Machine Learning",
    description:
      "This article will help you understand the basics of Python and the most common ways to use it for machine learning.",
  },
  {
    type: "text",
    title: "Crash Course in NumPy",
    description:
      "NumPy is a powerful library that allows you to perform common operations on arrays and matrices. This video will help you understand the basics of NumPy and how to use it to solve common machine learning problems.",
  },
  {
    type: "text",
    title: "Train, Test, and Validation Split",
    description:
      "This article will help you understand how to split your data into training, testing, and validation sets. It will also help you understand how to use the train_test_split function to split your data into training and testing sets.",
  },
  {
    type: "text",
    title: "Keras: Deep Learning for Python",
    description:
      "Keras is a powerful library that allows you to build and train deep learning models in Python. This video will help you understand the basics of Keras and how to use it to solve common machine learning problems.",
  },
  {
    type: "text",
    title: "TensorFlow: Deep Learning for Python",
    description:
      "TensorFlow is a powerful library that allows you to build and train deep learning models in Python. This video will help you understand the basics of TensorFlow and how to use it to solve common machine learning problems.",
  },
  {
    type: "text",
    title: "Linear Regression",
    description:
      "The first algorithm you will learn is linear regression. This article will help you understand the basics of linear regression and how to use it to solve common machine learning problems.",
  },
  {
    type: "text",
    title: "Logistic Regression",
    description:
      "The second algorithm you will learn is logistic regression. This article will help you understand the basics of logistic regression and how to use it to solve common machine learning problems.",
  },
  {
    type: "text",
    title: "K-Nearest Neighbors",
    description:
      "Finally, the third algorithm you will learn is k-nearest neighbors. This article will help you understand the basics of k-nearest neighbors and how to use it to solve common machine learning problems.",
  },
];
