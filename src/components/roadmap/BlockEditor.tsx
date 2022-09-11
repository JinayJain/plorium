import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoadmapBlockType } from "@prisma/client";
import { useCallback, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

import {
  CreateResourceFormValues,
  ResourceTypeOptions,
  createResourceSchema,
} from "@/util/forms/create-resource";

type Block = {
  id: string;
  type: RoadmapBlockType;
};

const ResourceBlockCreator = ({
  form: {
    register,
    formState: { errors },
  },
}: {
  form: UseFormReturn<CreateResourceFormValues>;
}) => {
  return (
    <form noValidate>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.url} isRequired>
          <FormLabel>URL</FormLabel>
          <Input type="url" {...register("url")} />
          <FormHelperText>https://example.com/resource</FormHelperText>
          <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea {...register("description")} />
          <FormHelperText>
            Share more about this resource and why it&apos;s great
          </FormHelperText>
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.type} isRequired>
          <FormLabel>Resource Type</FormLabel>
          <Select {...register("type")}>
            {ResourceTypeOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
        </FormControl>

        <Accordion defaultIndex={0} allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Similar Resources
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Box>TODO</Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </form>
  );
};

const NoteBlockCreator = () => {
  return <Box>Note</Box>;
};

function BlockEditor() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  const resourceForm = useForm<CreateResourceFormValues>({
    resolver: zodResolver(createResourceSchema),
  });

  const creatorTabs = [
    {
      type: RoadmapBlockType.RESOURCE,
      label: "Resource",
      component: <ResourceBlockCreator form={resourceForm} />,
    },
    {
      type: RoadmapBlockType.NOTE,
      label: "Note",
      component: <NoteBlockCreator />,
    },
  ];

  const onResourceSubmit = useCallback(
    (values: CreateResourceFormValues) => {
      resourceForm.reset();
      onClose();
    },
    [onClose, resourceForm],
  );

  return (
    <Box>
      <VStack>
        {blocks.map((block, index) => (
          <Box key={index}>block</Box>
        ))}
        <Button
          rightIcon={<SmallAddIcon />}
          colorScheme="green"
          onClick={onOpen}
        >
          Add
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl" closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Block</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs colorScheme="green" index={activeTab} onChange={setActiveTab}>
              <TabList>
                {creatorTabs.map(({ label }, index) => (
                  <Tab key={index}>{label}</Tab>
                ))}
              </TabList>
              <TabPanels>
                {creatorTabs.map(({ component }, index) => (
                  <TabPanel key={index}>{component}</TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4}>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="green"
                onClick={resourceForm.handleSubmit(onResourceSubmit)}
              >
                Add
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default BlockEditor;
