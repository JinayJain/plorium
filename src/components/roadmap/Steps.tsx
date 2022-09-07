import { Box, Stack, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

const TEMP_DATA = [
  {
    id: "1",
    name: "Learn HTML",
    description: "Learn the basics of HTML",
  },
  {
    id: "2",
    name: "Learn CSS",
    description: "CSS is the language for styling web pages",
  },
  {
    id: "3",
    name: "Learn JavaScript",
    description:
      "JavaScript is the programming language of the web used to make web pages interactive",
  },
];

function Steps() {
  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;
  }, []);

  return (
    <Droppable droppableId="steps">
      {(droppableProvided) => (
        <Stack
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
          {TEMP_DATA.map((step, index) => (
            <Draggable key={step.id} draggableId={step.id} index={index}>
              {(draggableProvided) => (
                <Box
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                  p={8}
                  border="1px solid"
                  borderRadius="md"
                >
                  <Text>{step.name}</Text>
                </Box>
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </Stack>
      )}
    </Droppable>
  );
}

export default Steps;
