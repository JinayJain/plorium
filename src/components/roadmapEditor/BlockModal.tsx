import {
  Button,
  FormControl,
  FormControlOptions,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";

import {
  CreateResourceFormValues,
  ResourceTypeOptions,
  useCreateResourceForm,
} from "@/util/forms/createResource";
import { useAppDispatch } from "@/util/redux/hooks";
import { addBlock } from "@/util/redux/slice/roadmapEditorSlice";

function BlockModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    register,
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

  const onSubmit = (values: CreateResourceFormValues) => {
    dispatch(
      addBlock({
        editorId: Math.random().toString(36).substring(7),
        kind: "resource",
        ...values,
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
          <form noValidate>
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
          </form>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BlockModal;
