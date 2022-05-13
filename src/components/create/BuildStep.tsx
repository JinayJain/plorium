import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";

const BuildStep = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <Stack spacing={4}>
      <VStack alignSelf="center" textAlign="center">
        <Heading>Build your roadmap</Heading>
        <Text color="gray" maxW="600px">
          Assemble the resources, guidance, and project materials for learners
          following your roadmap.
        </Text>
      </VStack>
      <Box h={500} bg="gray.200" rounded="xl"></Box>
      <HStack alignSelf="flex-end">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button colorScheme="green" onClick={onNext}>
          Continue
        </Button>
      </HStack>
    </Stack>
  );
};

export default BuildStep;
