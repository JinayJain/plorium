import {
  Badge,
  Box,
  Button,
  Heading,
  Link,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { simplifyUrl } from "../../lib/url";

interface TextBlockProps {
  type: "text";
  title: string;
  description: string;
}

enum ResourceType {
  Video = "video",
  Article = "article",
  Blog = "blog",
  Paper = "paper",
  Tutorial = "tutorial",
}

interface ResourceBlockProps {
  type: "resource";
  resourceType?: ResourceType;
  title: string;
  url: string;
  comment?: string;
}

interface ProjectBlockProps {
  type: "project";
  title: string;
  description: string;
}

type BlockProps = TextBlockProps | ResourceBlockProps | ProjectBlockProps;

const TextBlock = ({
  title,
  description: text,
}: TextBlockProps): JSX.Element => {
  return (
    <Stack bg="green.50" px={4} py={6} rounded="xl" shadow="md">
      <Heading size="md" color="green.800">
        {title}
      </Heading>
      <Text>{text}</Text>
    </Stack>
  );
};

const ResourceBlock = ({
  title,
  resourceType,
  url,
  comment,
}: ResourceBlockProps): JSX.Element => {
  return (
    <Box>
      <Stack bg="green.50" px={4} py={6} rounded="xl" shadow="md" align="start">
        <Badge colorScheme="blue">{resourceType}</Badge>
        <Heading size="md" color="green.800">
          {title}
        </Heading>
        <Link href={url} isExternal>
          {simplifyUrl(url)}
        </Link>
      </Stack>
      {comment && (
        <Box
          bgColor="blue.50"
          px={4}
          pt={10}
          pb={6}
          mt={-4}
          position="relative"
          zIndex={-1}
          roundedBottom="xl"
          shadow="md"
        >
          <Text>
            <Tag mr={2}>Author&apos;s Comment</Tag> {comment}
          </Text>
        </Box>
      )}
    </Box>
  );
};

const ProjectBlock = ({
  title,
  description,
}: ProjectBlockProps): JSX.Element => {
  return (
    <Stack bg="green.50" px={4} py={6} rounded="xl" shadow="md" align="start">
      <Heading size="md" color="green.800">
        {title}
      </Heading>
      <Text>{description}</Text>
      <Button colorScheme="teal" variant="outline" size="sm">
        View Gallery
      </Button>
    </Stack>
  );
};

const Block = (props: BlockProps): JSX.Element => {
  switch (props.type) {
    case "text":
      return <TextBlock {...props} />;
    case "resource":
      return <ResourceBlock {...props} />;
    case "project":
      return <ProjectBlock {...props} />;
  }
};

export default Block;

export { ResourceType };

export type {
  BlockProps,
  TextBlockProps,
  ResourceBlockProps,
  ProjectBlockProps,
};
