import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormControlOptions,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
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
} from "@chakra-ui/react";
import { RoadmapBlockType } from "@prisma/client";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { ResourceBlockData } from "@/pages/roadmap/create";
import {
  CreateResourceFormValues,
  ResourceTypeOptions,
  defaultCreateResourceFormValues,
  useCreateResourceForm,
} from "@/util/forms/create-resource";

import ResourceSuggestions from "../resource/ResourceSuggestions";

const ResourceBlockCreator = ({
  form: {
    register,
    formState: { errors },
    watch,
  },
  exists = false,
}: {
  form: UseFormReturn<CreateResourceFormValues>;
  exists?: boolean;
}) => {
  const getControlProps = (
    name: keyof CreateResourceFormValues,
  ): FormControlOptions => ({
    isInvalid: !!errors[name],
    isDisabled: exists,
    isRequired: true,
  });

  return (
    <form noValidate>
      <Stack spacing={4}>
        <FormControl {...getControlProps("name")}>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register("name")} autoFocus />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl {...getControlProps("url")}>
          <FormLabel>URL</FormLabel>
          <Input type="url" {...register("url")} />
          <FormHelperText>https://example.com/resource</FormHelperText>
          <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
        </FormControl>
        <FormControl {...getControlProps("description")}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register("description")} />
          <FormHelperText>
            Share more about this resource and why it&apos;s great
          </FormHelperText>
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <FormControl {...getControlProps("type")}>
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
            <AccordionPanel maxH="200px" overflowY="auto">
              <ResourceSuggestions
                query={watch("name")}
                onSelect={(resource) => {
                  console.log(resource);
                }}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </form>
  );
};

const NoteBlockCreator = () => {
  return <Box>TODO: Note Creator Form</Box>;
};

function BlockCreator({
  isOpen,
  onClose,
  onCreate,
  onEdit,
  block,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (block: ResourceBlockData) => void;
  onEdit: (block: ResourceBlockData) => void;
  block?: ResourceBlockData;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const resourceForm = useCreateResourceForm();

  const changeVerb = block ? "Update" : "Create";

  useEffect(() => {
    if (isOpen) {
      resourceForm.reset(block ?? defaultCreateResourceFormValues);
    }
  }, [isOpen, block, resourceForm]);

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

  const generateId = () => {
    return `block-${new Date().getTime()}`;
  };

  const onSubmit = (values: CreateResourceFormValues) => {
    if (block) {
      onEdit({
        ...block,
        ...values,
      });
    } else {
      onCreate({
        id: generateId(),
        existing: false,
        ...values,
      });
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" closeOnEsc={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{changeVerb} Block</ModalHeader>
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
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={resourceForm.handleSubmit(onSubmit)}
            >
              {changeVerb}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BlockCreator;
