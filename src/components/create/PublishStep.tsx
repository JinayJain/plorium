import { Box, Button, Heading, HStack, Stack } from "@chakra-ui/react";

const PublishStep = ({
  onSubmit,
  onPrev,
}: {
  onSubmit: () => void;
  onPrev: () => void;
}) => {
  return (
    <Stack>
      <Heading alignSelf="center">Publish your roadmap</Heading>
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
