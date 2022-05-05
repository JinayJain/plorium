import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Block from "../../components/roadmap/Block";
import Sidebar from "../../components/roadmap/Sidebar";
import TableOfContents from "../../components/roadmap/TableOfContents";

const Header = ({ title }: { title: string }) => (
  <Flex flex={1} textAlign="center" gap={2} flexDir="column">
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
    <Grid
      templateColumns="1fr minmax(auto, 900px) 1fr"
      templateRows="300px auto"
      gap={8}
    >
      <GridItem as={Flex} justify="flex-end" rowStart={2}>
        <Sidebar
          title={title}
          description={description}
          author={author}
          maxW="200px"
          position="sticky"
          top={8}
          alignSelf="flex-start"
        />
      </GridItem>
      <GridItem alignItems="flex-end" display="flex" colStart={2}>
        <Header title={title} />
      </GridItem>
      <GridItem colStart={2} rowStart={2}>
        <Stack gap={4}>
          {RESOURCES.map((resource, index) => (
            <Block key={index} {...resource} />
          ))}
        </Stack>
      </GridItem>
      <GridItem
        rowStart={2}
        colStart={3}
        alignSelf="flex-start"
        position="sticky"
        top={8}
      >
        <Heading size="sm" color="green.700" mb={2}>
          ROADMAP
        </Heading>
        <TableOfContents resources={RESOURCES} />
      </GridItem>
    </Grid>
  );
};

export default Home;

// a list of resources for learning about machine learning, in order
const RESOURCES = [
  {
    title: "What is Machine Learning?",
    description:
      "First, we need to understand the types of problems machine learning is best at solving. This article will help you understand the overall scope of machine learning and how it fits into the broader field of artificial intelligence.",
  },
  {
    title: "Essential Python for Machine Learning",
    description:
      "This article will help you understand the basics of Python and the most common ways to use it for machine learning.",
  },
  {
    title: "Crash Course in NumPy",
    description:
      "NumPy is a powerful library that allows you to perform common operations on arrays and matrices. This video will help you understand the basics of NumPy and how to use it to solve common machine learning problems.",
  },
  {
    title: "Train, Test, and Validation Split",
    description:
      "This article will help you understand how to split your data into training, testing, and validation sets. It will also help you understand how to use the train_test_split function to split your data into training and testing sets.",
  },
  {
    title: "Keras: Deep Learning for Python",
    description:
      "Keras is a powerful library that allows you to build and train deep learning models in Python. This video will help you understand the basics of Keras and how to use it to solve common machine learning problems.",
  },
  {
    title: "TensorFlow: Deep Learning for Python",
    description:
      "TensorFlow is a powerful library that allows you to build and train deep learning models in Python. This video will help you understand the basics of TensorFlow and how to use it to solve common machine learning problems.",
  },
  {
    title: "Linear Regression",
    description:
      "The first algorithm you will learn is linear regression. This article will help you understand the basics of linear regression and how to use it to solve common machine learning problems.",
  },
  {
    title: "Logistic Regression",
    description:
      "The second algorithm you will learn is logistic regression. This article will help you understand the basics of logistic regression and how to use it to solve common machine learning problems.",
  },
  {
    title: "K-Nearest Neighbors",
    description:
      "Finally, the third algorithm you will learn is k-nearest neighbors. This article will help you understand the basics of k-nearest neighbors and how to use it to solve common machine learning problems.",
  },
];
