import { Box, BoxProps, Stack, Text } from "@chakra-ui/react";

const TableOfContents = ({
  resources,
  ...props
}: {
  resources: {
    title: string;
  }[];
} & BoxProps) => (
  <Box {...props}>
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
