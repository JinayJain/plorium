import {
  Box,
  BoxProps,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFocusScope,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  forwardRef,
  useDisclosure,
} from "@chakra-ui/react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FaGripVertical } from "react-icons/fa";

import CreateResourceForm from "../resource/CreateResourceForm";

const ResourceBlock = forwardRef<BoxProps, "div">((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      ref={ref}
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      shadow="sm"
      {...props}
    >
      <Button colorScheme="green" onClick={onOpen}>
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Resource</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateResourceForm
              onSubmit={async () => {
                console.log("submit");
              }}
              isLoading={false}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
});

function Steps() {
  return (
    <Droppable droppableId="steps">
      {(provided) => (
        <Stack ref={provided.innerRef} {...provided.droppableProps} spacing={4}>
          {[1, 2, 3, 4].map((step, index) => (
            <Draggable key={step} draggableId={step.toString()} index={index}>
              {(provided) => (
                <ResourceBlock
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Stack>
      )}
    </Droppable>
  );
}

export default Steps;
