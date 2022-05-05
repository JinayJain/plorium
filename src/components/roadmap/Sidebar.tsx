import { SmallAddIcon } from "@chakra-ui/icons";
import {
  BoxProps,
  Text,
  Box,
  Stack,
  Heading,
  HStack,
  Button,
} from "@chakra-ui/react";

const Sidebar = ({
  title,
  author,
  description,
  ...props
}: { title: string; author: string; description: string } & BoxProps) => (
  <Box {...props}>
    <Stack textAlign="right" align="flex-end" gap={2}>
      <Heading size="md">{title}</Heading>
      <HStack>
        <Heading size="sm">{author}</Heading>
      </HStack>
      <Text fontSize="lg">{description}</Text>
    </Stack>
    <Button colorScheme="teal" w="full" mt={12} leftIcon={<SmallAddIcon />}>
      Join
    </Button>
  </Box>
);

export default Sidebar;
