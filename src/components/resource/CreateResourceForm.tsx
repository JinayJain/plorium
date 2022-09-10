import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResourceTypeOptions = Object.keys(ResourceType).map((key) => ({
  value: key,
  // Make all but first letter lowercase
  label: key[0] + key.slice(1).toLowerCase(),
}));

const createResourceSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  type: z.nativeEnum(ResourceType),
  url: z.string().url(),
});

export type CreateResourceFormValues = z.infer<typeof createResourceSchema>;

function CreateResourceForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (values: CreateResourceFormValues) => Promise<void>;
  isLoading: boolean;
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateResourceFormValues>({
    resolver: zodResolver(createResourceSchema),
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

        <Button
          colorScheme="green"
          type="submit"
          isLoading={isLoading}
          loadingText="Creating"
          rightIcon={<SmallAddIcon />}
        >
          Create
        </Button>
      </Stack>
    </form>
  );
}

export default CreateResourceForm;
