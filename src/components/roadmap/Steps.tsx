import { Box, Button, HStack, Icon, Input, Stack } from "@chakra-ui/react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFormRegister,
} from "react-hook-form";
import { FaGratipay, FaGripVertical } from "react-icons/fa";

function Steps({
  fields,
  register,
  append,
}: {
  fields: Record<"id", string>[];
  register: UseFormRegister<FieldValues>;
  append: UseFieldArrayAppend<FieldValues, "steps">;
}) {
  return (
    <Droppable droppableId="steps">
      {(droppableProvided) => (
        <Stack
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
          {fields.map((field, index) => (
            <Draggable key={field.id} draggableId={field.id} index={index}>
              {(draggableProvided, snapshot) => (
                <HStack
                  p={4}
                  shadow="sm"
                  bg={snapshot.isDragging ? "gray.100" : "white"}
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                >
                  <Box
                    {...draggableProvided.dragHandleProps}
                    _hover={{
                      bg: "gray.300",
                    }}
                  >
                    <Icon as={FaGripVertical} />
                  </Box>
                  <Input {...register(`steps.${index}.name`)} />
                </HStack>
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
          <Button
            onClick={() => {
              append({ name: Math.random().toString() });
            }}
          >
            Add Step
          </Button>
        </Stack>
      )}
    </Droppable>
  );
}

export default Steps;
