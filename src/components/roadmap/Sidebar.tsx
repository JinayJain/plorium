import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Stack,
  Heading,
  HStack,
  Button,
  AvatarGroup,
  Avatar,
  FlexProps,
} from "@chakra-ui/react";

const Sidebar = ({
  title,
  author,
  description,
  ...props
}: { title: string; author: string; description: string } & FlexProps) => (
  <Flex {...props} flexDir="column">
    <Stack gap={2}>
      <Heading size="md">{title}</Heading>
      <HStack>
        <Heading size="sm">{author}</Heading>
      </HStack>
      <Text fontSize="lg">{description}</Text>
    </Stack>
    <Button colorScheme="teal" w="full" mt={12} leftIcon={<SmallAddIcon />}>
      Join
    </Button>
    <HStack alignSelf="center" mt={4}>
      <AvatarGroup size="sm">
        <Avatar name="Harvey Specter" />
        <Avatar name="Jessica Pearson" />
        <Avatar name="Mike Ross" />
      </AvatarGroup>
      <Text color="gray.600">12 Learners</Text>
    </HStack>
  </Flex>
);

export default Sidebar;
