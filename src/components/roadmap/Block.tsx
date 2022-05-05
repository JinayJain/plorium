import { Badge, Box, Heading, Stack, Text } from "@chakra-ui/react";

interface TextBlockProps {
  type: "text";
  title: string;
  description: string;
}

interface ResourceBlockProps {
  type: "resource";
  resourceType: "video" | "article" | "tutorial";
  title: string;
  url: string;
  description: string;
  comment?: string;
}

interface ProjectBlockProps {
  type: "project";
  title: string;
  description: string;
}

type BlockProps = TextBlockProps | ResourceBlockProps | ProjectBlockProps;

const TextBlock = ({
  type,
  title,
  description: text,
}: TextBlockProps): JSX.Element => {
  return (
    <Stack bg="green.50" px={4} py={6} rounded="xl" shadow="md">
      <Badge alignSelf="flex-start" colorScheme="blue">
        VIDEO
      </Badge>
      <Heading size="md" color="green.800">
        {title}
      </Heading>
      <Text>{text}</Text>
    </Stack>
  );
};

const ResourceBlock = ({
  title,
  url,
  description,
}: ResourceBlockProps): JSX.Element => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <a href={url}>{url}</a>
    </div>
  );
};

const ProjectBlock = ({
  title,
  description,
}: ProjectBlockProps): JSX.Element => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
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

export type {
  BlockProps,
  TextBlockProps,
  ResourceBlockProps,
  ProjectBlockProps,
};
