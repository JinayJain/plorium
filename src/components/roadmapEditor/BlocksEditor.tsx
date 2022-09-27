import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  FaGripLines,
  FaGripLinesVertical,
  FaGripVertical,
} from "react-icons/fa";

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

function BlocksEditor() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const blocks = useAppSelector((state) => state.roadmapEditor.blocks);

  return (
    <Droppable droppableId="blocks">
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps}>
          {blocks.map((block, index) => (
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
                      <ResourceBlockPreview {...block} isNew={!block.id} />
                    ) : (
                      <Text>Unknown block kind</Text>
                    )}
                  </Box>{" "}
                </Flex>
              )}
            </Draggable>
          ))}
          {provided.placeholder}

          <Button onClick={onOpen}>Add</Button>

          <BlockModal isOpen={isOpen} onClose={onClose} />
        </Box>
      )}
    </Droppable>
  );
}

export default BlocksEditor;
