import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FaGripVertical } from "react-icons/fa";

import { useAppSelector } from "@/util/redux/hooks";

import TypeTag from "../resource/TypeTag";
import BlockModal from "./BlockModal";

function ResourceBlockPreview({
  isNew,
  title,
  type,
  description,
  url,
}: Pick<Resource, "title" | "type" | "description" | "url"> & {
  isNew: boolean;
}) {
  return (
    <>
      <Heading size="sm">
        {title} <TypeTag type={type} size="sm" />{" "}
        {isNew && (
          <Tag colorScheme="green" size="sm">
            NEW
          </Tag>
        )}
      </Heading>
      <Text>{description}</Text>
      <Text>{url}</Text>
    </>
  );
}

function NoteBlockPreview({
  title,
  content,
}: {
  title?: string;
  content: string;
}) {
  return (
    <>
      {title && <Heading size="sm">{title}</Heading>}
      <Text>{content}</Text>
    </>
  );
}

function BlocksEditor() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const blocks = useAppSelector((state) => state.roadmapEditor.blocks);

  return (
    <Droppable droppableId="blocks">
      {(provided) => (
        <Flex
          direction="column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Heading size="md">Blocks</Heading>
          <Divider my={4} />

          {blocks.length === 0 ? (
            <Box textAlign="center" mb={4}>
              <Text color="gray">Start by adding a block to your roadmap</Text>
            </Box>
          ) : (
            blocks.map((block, index) => (
              <Draggable
                key={block.editorId}
                draggableId={block.editorId}
                index={index}
              >
                {(provided) => (
                  <Flex
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    mb={4}
                  >
                    <Flex align="center" justify="center" mx={2}>
                      <Box
                        {...provided.dragHandleProps}
                        p={1}
                        _hover={{ bg: "gray.100" }}
                      >
                        <Icon as={FaGripVertical} />
                      </Box>
                    </Flex>
                    <Box p={4} flex="1" borderWidth={1} bg="white">
                      {block.kind === "resource" ? (
                        <ResourceBlockPreview
                          {...block.resource}
                          isNew={!block.resource.id}
                        />
                      ) : block.kind === "note" ? (
                        <NoteBlockPreview
                          title={block.note.title}
                          content={block.note.content}
                        />
                      ) : null}
                    </Box>{" "}
                  </Flex>
                )}
              </Draggable>
            ))
          )}
          {provided.placeholder}

          <Button
            colorScheme="green"
            alignSelf="center"
            variant="outline"
            onClick={() => onOpen()}
            leftIcon={<AddIcon />}
          >
            Add Block
          </Button>
          <BlockModal isOpen={isOpen} onClose={onClose} />
        </Flex>
      )}
    </Droppable>
  );
}

export default BlocksEditor;
