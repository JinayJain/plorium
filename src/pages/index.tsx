import {
  Box,
  BoxProps,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";

const RESOURCES = [
  {
    title: "Chakra UI",
    description:
      "A set of React components for building user interfaces. It's built on top of React Hooks and TypeScript.",
  },
  {
    title: "Next.js",
    description:
      "A framework for server-rendered React applications. It's built on top of React Hooks and TypeScript.",
  },
  {
    title: "React",
    description:
      "A JavaScript library for building user interfaces. It's built on top of React Hooks and TypeScript.",
  },
];

const filler =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis deleniti ipsam impedit quo, perspiciatis perferendis reiciendis quod beatae quibusdam, quisquam dignissimos amet. Ad non ab iste molestiae nisi modi odit, quas sint amet iure? Itaque delectus veritatis voluptate corporis veniam similique autem aut? Repellat asperiores blanditiis expedita neque molestiae hic.";

const Header = ({ title }: { title: string }) => (
  <Flex flex={1} textAlign="center" gap={2} flexDir="column">
    <Heading color="gray.400" fontWeight="normal" size="md">
      5 Days &middot; 21 Resources &middot; Beginner
    </Heading>
    <Heading size="xl">{title}</Heading>
  </Flex>
);

const Sidebar = ({ title, ...props }: { title: string } & BoxProps) => (
  <Box textAlign="right" {...props}>
    <Heading size="md">{title}</Heading>
  </Box>
);

const ProgressNav = () => (
  <Stack>
    {RESOURCES.map((resource, index) => (
      <Text key={index}>{resource.title}</Text>
    ))}
  </Stack>
);

const Block = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Box
    border="1px"
    borderColor="gray"
    shadow="md"
    px={4}
    py={6}
    borderRadius={8}
  >
    <Heading size="md">{title}</Heading>
    <Text>{description}</Text>
  </Box>
);

const Home: NextPage = () => {
  const title = "Beginner's Guide to Artificial Intelligence";

  return (
    <Grid
      templateColumns="1fr minmax(auto, 900px) 1fr"
      templateRows="300px auto"
      gap={8}
    >
      <GridItem as={Flex} justify="flex-end" rowStart={2}>
        <Sidebar
          title={title}
          maxW="200px"
          position="sticky"
          top={4}
          alignSelf="flex-start"
        />
      </GridItem>
      <GridItem alignItems="flex-end" display="flex" colStart={2}>
        <Header title={title} />
      </GridItem>
      <GridItem colStart={2} rowStart={2}>
        <Stack gap={2}>
          {[...Array(1)]
            .map(() =>
              RESOURCES.map((resource, index) => (
                <Block key={index} {...resource} />
              ))
            )
            .flat()}
        </Stack>
      </GridItem>
      <GridItem
        rowStart={2}
        colStart={3}
        alignSelf="flex-start"
        position="sticky"
        top={4}
      >
        <Heading size="sm" color="gray.400" mb={2}>
          ROADMAP
        </Heading>
        <ProgressNav />
      </GridItem>
    </Grid>
  );
};

export default Home;
