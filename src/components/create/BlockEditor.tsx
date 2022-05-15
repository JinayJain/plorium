import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  ButtonProps,
  Heading,
  EditableInput,
  EditablePreview,
  Editable,
  Stack,
  Tooltip,
  useEditableControls,
  TextProps,
  BoxProps,
  EditableInputProps,
  EditableTextarea,
  EditableTextareaProps,
} from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { MdDescription, MdTextFields } from "react-icons/md";
import { GoTools } from "react-icons/go";
import React from "react";

type BlockType = "text" | "resource" | "project";

const AddButton = ({
  onAdd,
  ...props
}: ButtonProps & {
  onAdd: (type: BlockType) => void;
}) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            leftIcon={<AddIcon />}
            aria-label="Add block"
            colorScheme="green"
            {...props}
          >
            Block
          </MenuButton>
          <MenuList>
            <MenuItem icon={<MdTextFields />} onClick={() => onAdd("text")}>
              Text
            </MenuItem>
            <MenuItem
              icon={<MdDescription />}
              onClick={() => onAdd("resource")}
            >
              Resource
            </MenuItem>
            <MenuItem icon={<GoTools />} onClick={() => onAdd("project")}>
              Project
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

interface ClickToEditProps {
  isHeading?: boolean;
  text?: string;
}

const ClickToEdit: React.FC<ClickToEditProps> = ({
  isHeading = false,
  text = "Click to Edit",
}) => {
  const { getEditButtonProps, isEditing } = useEditableControls();

  const boxStyleProps: BoxProps = {
    _hover: {
      bg: "gray.100",
    },
    w: "full",
    transition: "all 0.3s",
    rounded: "md",
  };

  const textStyleProps: TextProps = {
    p: 1,
    color: "gray",
  };

  return !isEditing ? (
    <Box {...boxStyleProps}>
      {isHeading ? (
        <Heading size="md" {...getEditButtonProps()} {...textStyleProps}>
          {text}
        </Heading>
      ) : (
        <Text {...getEditButtonProps()} {...textStyleProps}>
          {text}
        </Text>
      )}
    </Box>
  ) : null;
};

const EditableText = ({
  isHeading = false,
  isTextarea = false,
  placeholder = "Click to Edit",
}: {
  isHeading?: boolean;
  isTextarea?: boolean;
  placeholder?: string;
}) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [value, setValue] = useState("");

  const inputProps: EditableInputProps & EditableTextareaProps = {
    onChange: (e) => setValue(e.target.value),
  };

  useEffect(() => {
    setIsEmpty(value.length === 0);
  }, [value]);

  return (
    <Editable defaultValue={value}>
      <Tooltip label="Click to edit">
        <Box w="full">
          {!isEmpty ? (
            isHeading ? (
              <Heading
                as={EditablePreview}
                fontSize="lg"
                color={isEmpty ? "gray.600" : "initial"}
                w="full"
                _hover={{
                  bg: "gray.100",
                }}
              />
            ) : (
              <Text
                as={EditablePreview}
                color={isEmpty ? "gray.600" : "initial"}
                w="full"
                _hover={{
                  bg: "gray.100",
                }}
              />
            )
          ) : (
            <ClickToEdit text={placeholder} isHeading={isHeading} />
          )}
        </Box>
      </Tooltip>
      {isTextarea ? (
        <EditableTextarea {...inputProps} />
      ) : (
        <EditableInput {...inputProps} />
      )}
    </Editable>
  );
};

const EditableBlock = ({
  block,
}: {
  block: {
    index: number;
    type: BlockType;
  };
}) => {
  return (
    <Stack minH="80px" bg="white" rounded="lg" p={4}>
      <EditableText placeholder="Title" isHeading />
      <EditableText placeholder="Description" isTextarea />
    </Stack>
  );
};

const BlockEditor = () => {
  const [blocks, setBlocks] = useState<
    {
      index: number;
      type: BlockType;
    }[]
  >([]);

  const addBlock = (type: BlockType, index?: number) => {
    const newBlock = {
      index: index || blocks.length,
      type,
    };

    if (index === undefined) {
      setBlocks([...blocks, newBlock]);
      return;
    }

    setBlocks([...blocks.slice(0, index), newBlock, ...blocks.slice(index)]);
  };

  return (
    <Box minH={300} bg="gray.100" rounded="xl" px={4}>
      {blocks.length ? (
        blocks.map((block, index) => (
          <Fragment key={index}>
            <Center h={4} role="group">
              <AddButton
                _groupHover={{
                  opacity: 1,
                }}
                opacity={0}
                size="sm"
                onAdd={(type) => addBlock(type, index)}
              />
            </Center>
            <EditableBlock block={block} />
          </Fragment>
        ))
      ) : (
        <Center my={4}>
          <Text fontSize="lg" color="green.800">
            Add your first block to get started
          </Text>
        </Center>
      )}

      <Center my={4}>
        <AddButton size="md" onAdd={addBlock} />
      </Center>
    </Box>
  );
};

export default BlockEditor;
