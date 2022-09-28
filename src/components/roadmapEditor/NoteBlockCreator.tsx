import {
  FormControl,
  FormControlOptions,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";

import { CreateNoteFormValues } from "@/util/forms/createNote";

function NoteBlockCreator({
  form: {
    register,
    formState: { errors },
  },
}: {
  form: UseFormReturn<CreateNoteFormValues>;
  onClose: () => void;
}) {
  const getFieldControlProps = (
    name: keyof CreateNoteFormValues,
  ): FormControlOptions => ({
    isInvalid: !!errors[name],
  });

  return (
    <Stack spacing={4}>
      <FormControl {...getFieldControlProps("title")}>
        <FormLabel>Title</FormLabel>
        <Input {...register("title")} />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl {...getFieldControlProps("content")} isRequired>
        <FormLabel>Content</FormLabel>
        <Textarea {...register("content")} />
        <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
}

export default NoteBlockCreator;
