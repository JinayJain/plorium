import { Box, Heading, Stack, Text } from "@chakra-ui/react";

const TableOfContents = ({
  resources,
}: {
  resources: {
    title: string;
  }[];
}) => (
  <Box>
    <Text fontWeight="medium" size="sm" color="green.800" mb={2}>
      ROADMAP
    </Text>
    <Stack>
      {resources.map((resource, index) => (
        <Text key={index}>{resource.title}</Text>
      ))}
    </Stack>
  </Box>
);

export default TableOfContents;
