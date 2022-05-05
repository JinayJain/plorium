import { Box, Heading, Text } from "@chakra-ui/react";

const Block = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Box bg="green.50" shadow="md" px={4} py={6} rounded="lg">
    <Heading size="md" color="green.800" mb={1}>
      {title}
    </Heading>
    <Text>{description}</Text>
  </Box>
);

export default Block;
