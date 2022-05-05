import { Stack, Text } from "@chakra-ui/react";

const TableOfContents = ({
  resources,
}: {
  resources: {
    title: string;
  }[];
}) => (
  <Stack>
    {resources.map((resource, index) => (
      <Text key={index}>{resource.title}</Text>
    ))}
  </Stack>
);

export default TableOfContents;
