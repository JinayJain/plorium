import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { useAppSelector } from "@/util/redux/hooks";

import BlockModal from "./BlockModal";

function BlocksEditor() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const blocks = useAppSelector((state) => state.roadmapEditor.blocks);

  return (
    <Droppable droppableId="blocks">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {blocks.map((block, index) => (
            <Draggable
              key={block.editorId}
              draggableId={block.editorId}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {block.kind === "resource" ? (
                    <>
                      <Heading size="sm">{block.title}</Heading>
                      <Text>{block.description}</Text>
                    </>
                  ) : (
                    <Text>Unknown block kind</Text>
                  )}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}

          <Button onClick={onOpen}>Add</Button>

          <BlockModal isOpen={isOpen} onClose={onClose} />
        </div>
      )}
    </Droppable>
  );
}

export default BlocksEditor;
