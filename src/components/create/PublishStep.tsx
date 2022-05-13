import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";

const PublishStep = ({
  onSubmit,
  onPrev,
}: {
  onSubmit: () => void;
  onPrev: () => void;
}) => {
  return (
    <Stack>
      <VStack alignSelf="center" textAlign="center">
        <Heading>Publish your roadmap</Heading>
        <Text color="gray" maxW="600px">
          Review your roadmap to check it for completeness and errors. Once you
          hit publish, it will be available for anyone to start their learning
          journey.
        </Text>
      </VStack>
      <HStack alignSelf="flex-end">
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onSubmit} colorScheme="teal">
          Publish
        </Button>
      </HStack>
    </Stack>
  );
};

export default PublishStep;
