import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

import { ResourceBlockData } from "@/pages/roadmap/create";

import BlockCreator from "./BlockCreator";

const DeleteButton = ({
  onDelete,
  dialog,
}: {
  onDelete: () => void;
  dialog: string;
}) => (
  <Popover>
    {({ onClose }) => (
      <>
        <PopoverTrigger>
          <Button size="sm" colorScheme="red">
            Delete
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>Are you sure you want to delete this block?</PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup>
              <Button size="sm" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </>
    )}
  </Popover>
);

const ResourceBlock = ({
  block,
  onEdit,
  onDelete,
}: {
  block: ResourceBlockData;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <Box w="full" p={4} bg="gray.100" borderRadius="md">
      <Flex justify="space-between" align="center">
        <Heading size="md">{block.name}</Heading>
        <HStack>
          <Button size="sm" colorScheme="blue" onClick={onEdit}>
            Edit
          </Button>
          <DeleteButton
            onDelete={onDelete}
            dialog="Are you sure you want to delete this block?"
          />
        </HStack>
      </Flex>
      <Text>{block.description}</Text>
    </Box>
  );
};

function RoadmapEditor({
  blocks,
  onCreate,
  onEdit,
  onDelete,
}: {
  blocks: ResourceBlockData[];
  onCreate: (block: ResourceBlockData, index: number) => void;
  onEdit: (block: ResourceBlockData, index: number) => void;
  onDelete: (index: number) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editContext, setEditContext] = useState<{
    index: number;
    block?: ResourceBlockData;
  }>({
    index: blocks.length,
  });

  return (
    <Box>
      <VStack>
        {blocks.map((block, index) => (
          <ResourceBlock
            key={block.id}
            block={block}
            onEdit={() => {
              setEditContext({ index, block });
              onOpen();
            }}
            onDelete={() => onDelete(index)}
          />
        ))}
        <Button
          rightIcon={<SmallAddIcon />}
          colorScheme="green"
          onClick={() => {
            setEditContext({
              index: blocks.length,
              block: undefined,
            });
            onOpen();
          }}
        >
          Add
        </Button>

        <BlockCreator
          isOpen={isOpen}
          onCreate={(block) => onCreate(block, blocks.length)}
          onEdit={(block) => onEdit(block, editContext.index)}
          onClose={onClose}
          block={editContext.block}
        />
      </VStack>
    </Box>
  );
}

export default RoadmapEditor;