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
        <Text color="gray" maxW="700px">
          Take a moment to review your roadmap and make sure everything is how
          you want it.
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
