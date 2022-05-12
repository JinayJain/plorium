import { Box, Button, Heading, HStack, Stack } from "@chakra-ui/react";

const BuildStep = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <Stack spacing={4}>
      <Heading alignSelf="center">Build your roadmap</Heading>
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
