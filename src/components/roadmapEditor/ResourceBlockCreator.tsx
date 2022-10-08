import {
  FormControl,
  FormControlOptions,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Resource } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

import {
  CreateResourceFormValues,
  ResourceTypeOptions,
} from "@/util/forms/createResource";
import useDebounce from "@/util/hooks/useDebounce";
import { useAppDispatch } from "@/util/redux/hooks";
import { addBlock } from "@/util/redux/slice/roadmapEditorSlice";

import Suggestions from "../resource/Suggestions";

function ResourceBlockCreator({
  form: {
    register,
    watch,
    formState: { errors },
  },
  onClose,
}: {
  form: UseFormReturn<CreateResourceFormValues>;
  onClose: () => void;
}) {
  const query = useDebounce(watch("title"), 500);

  const getFieldControlProps = (
    name: keyof CreateResourceFormValues,
  ): FormControlOptions => ({
    isInvalid: !!errors[name],
    isRequired: true,
  });

  const dispatch = useAppDispatch();

  const onSelect = (resource: Resource) => {
    dispatch(
      addBlock({
        editorId: Math.random().toString(36).substring(7),
        kind: "resource",
        resource,
      }),
    );

    onClose();
  };

  return (
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

      <Suggestions query={query} onSelect={onSelect} />
    </Stack>
  );
}

export default ResourceBlockCreator;
