import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceType } from "@prisma/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Layout from "@/components/layout/Layout";
import {
  CreateResourceFormValues,
  ResourceTypeOptions,
  createResourceSchema,
} from "@/util/forms/create-resource";
import { trpc } from "@/util/trpc";

function CreateResource() {
  const createResourceMutation = trpc.useMutation("resource.create");
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateResourceFormValues>({
    resolver: zodResolver(createResourceSchema),
  });

  const onSubmit = async (values: CreateResourceFormValues) => {
    const resource = await createResourceMutation.mutateAsync(values);

    toast({
      title: "Resource created.",
      status: "success",
      isClosable: true,
    });
    reset();
    router.push(`/resource/${resource.id}`);
  };

  return (
    <Layout>
      <Heading>Create Resource</Heading>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
          <Button leftIcon={<SmallAddIcon />} colorScheme="green" type="submit">
            Create Resource
          </Button>
        </Stack>
      </form>
    </Layout>
  );
}

export default CreateResource;
