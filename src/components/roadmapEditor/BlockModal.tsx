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
  FormLabel,
  Heading,
  Input,
  Link,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import NextLink from "next/link";

import {
  CreateResourceFormValues,
  ResourceTypeOptions,
  useCreateResourceForm,
} from "@/util/forms/createResource";
import { useAppDispatch } from "@/util/redux/hooks";
import { addBlock } from "@/util/redux/slice/roadmapEditorSlice";
import { trpc } from "@/util/trpc";

function Suggestions({
  query,
  onSelect,
}: {
  query: string;
  onSelect: (resource: Resource) => void;
}) {
  const { data } = trpc.useQuery([
    "resource.suggestions",
    {
      query,
    },
  ]);

  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Suggestions
            </Box>

            <AccordionIcon />
          </AccordionButton>
        </h2>

        <AccordionPanel>
          <Stack spacing={4}>
            {data &&
              data.map((resource) => (
                <Flex key={resource.id}>
                  <Box flex="1">
                    <NextLink href={`/resource/${resource.id}`} passHref>
                      <Link target="_blank">
                        <Heading size="sm">{resource.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text>{resource.url}</Text>
                  </Box>

                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => onSelect(resource)}
                    size="sm"
                  >
                    Select
                  </Button>
                </Flex>
              ))}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function BlockModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useCreateResourceForm();

  const dispatch = useAppDispatch();

  const getFieldControlProps = (
    name: keyof CreateResourceFormValues,
  ): FormControlOptions => ({
    isInvalid: !!errors[name],
    isRequired: true,
  });

  const onCreate = (values: CreateResourceFormValues) => {
    dispatch(
      addBlock({
        editorId: Math.random().toString(36).substring(7),
        kind: "resource",
        ...values,
      }),
    );

    onClose();
  };

  const onSelect = (resource: Resource) => {
    dispatch(
      addBlock({
        editorId: Math.random().toString(36).substring(7),
        kind: "resource",
        ...resource,
      }),
    );

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Block</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl {...getFieldControlProps("title")}>
              <FormLabel>Title</FormLabel>
              <Input {...register("title")} />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl {...getFieldControlProps("description")}>
              <FormLabel>Description</FormLabel>
              <Textarea {...register("description")} />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <FormControl {...getFieldControlProps("url")}>
              <FormLabel>URL</FormLabel>
              <Input {...register("url")} />
              <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
            </FormControl>

            <FormControl {...getFieldControlProps("type")}>
              <FormLabel>Type</FormLabel>
              <Select {...register("type")}>
                {ResourceTypeOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
            </FormControl>

            <Suggestions query={watch("title")} onSelect={onSelect} />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(onCreate)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BlockModal;
