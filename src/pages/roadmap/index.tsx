import Block, {
  BlockProps,
  ResourceType,
} from "../../components/roadmap/Block";
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
          maxW="200px"
          author={author}
          position="sticky"
          top={8}
          display={{
            base: "none",
            md: "flex",
          }}
          mr={8}
        />
        <Stack gap={4} flex={1}>
          {RESOURCES.map((resource, index) => (
            <Block key={index} {...resource} />
          ))}
        </Stack>
        <TableOfContents
          resources={RESOURCES}
          position="sticky"
          maxW="200px"
          top={8}
          display={{
            base: "none",
            lg: "block",
          }}
          ml={8}
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
    title: "Welcome to the Roadmap!",
    description:
      "This roadmap is meant to be a guide through the world of AI. It includes a list of resources to help you get started, as well as a list of projects that you can try out as you begin to learn. We'll first learn about the concepts behind machine learning, then we will dive into the specifics of how to implement these in Python.",
  },
  {
    type: "resource",
    resourceType: ResourceType.Video,
    title: "What is Machine Learning?",
    url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
    comment:
      "A short introduction to machine learning, where it's used and why it has come to dominate computer science.",
  },
  {
    type: "resource",
    resourceType: ResourceType.Video,
    title: "The Difference Between Deep Learning and Machine Learning",
    url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
    comment:
      "Many people think that machine learning and deep learning are the same. This is not entirely true. Deep learning is a subset of machine learning that is more focused on neural networks.",
  },
  {
    type: "text",
    title: "Coding",
    description:
      "Most of the time, you'll be coding in Python. We'll start with a simple example, and then move on to more complex examples. We'll also cover some of the more advanced topics, such as neural networks and reinforcement learning.",
  },
  {
    type: "resource",
    resourceType: ResourceType.Blog,
    title: "Python for ML Beginners",
    url: "https://www.kaggle.com/jamesmcguigan/python-for-ml-beginners",
  },
  {
    type: "resource",
    resourceType: ResourceType.Tutorial,
    title: "Deep Learning with PyTorch: A 60 Minute Blitz",
    url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",
  },
  {
    type: "project",
    title: "MNIST Digit Classifier",
    description:
      "A simple MNIST digit classifier. It uses the LeNet architecture, and uses the PyTorch library.",
  },
  {
    type: "text",
    title: "Seminal Papers",
    description:
      "The field of machine learning is a rapidly growing field. There are many seminal papers that have been published, and there are many more to come. We'll cover some of the most recent ones, but the list is ever-growing.",
  },
  {
    type: "resource",
    resourceType: ResourceType.Paper,
    title: "Attention Is All You Need",
    url: "https://arxiv.org/pdf/1706.03762.pdf",
  },
  {
    type: "resource",
    resourceType: ResourceType.Paper,
    title: "A Neural Algorithm of Artistic Style",
    url: "https://arxiv.org/pdf/1508.06576.pdf",
  },
  {
    type: "resource",
    resourceType: ResourceType.Paper,
    title: "Generative Adversarial Networks",
    url: "https://arxiv.org/pdf/1406.2661.pdf",
  },
];
