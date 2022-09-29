import { Heading, Text } from "@chakra-ui/react";

function NoteBlock({
  content,
  title,
}: {
  content: string;
  title: string | null;
}) {
  return (
    <>
      {title && (
        <Heading size="md" mb={2}>
          {title}
        </Heading>
      )}
      <Text>{content}</Text>
    </>
  );
}

export default NoteBlock;
